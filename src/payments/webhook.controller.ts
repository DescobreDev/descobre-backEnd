import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

type AsaasEvent =
  | 'PAYMENT_CONFIRMED'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_OVERDUE'
  | 'PAYMENT_REFUNDED'
  | 'PAYMENT_CHARGEBACK_REQUESTED'
  | 'SUBSCRIPTION_DELETED';

interface AsaasWebhookPayload {
  id: string;
  event: AsaasEvent;
  payment: {
    id: string;
    subscription: string;
    status: string;
    value: number;
    dueDate: string;
  };
}

@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  @Post('asaas')
  @HttpCode(HttpStatus.OK)
  async handleAsaas(
    @Body() body: AsaasWebhookPayload,
    @Headers('asaas-access-token') token: string,
  ) {
    const expectedToken = this.config.get<string>('ASAAS_WEBHOOK_TOKEN');

    if (!this.isValidToken(token, expectedToken)) {
      this.logger.warn(
        `[Webhook] Token inválido recebido (header presente: ${!!token})`,
      );
      throw new UnauthorizedException('Token inválido.');
    }

    const { event, payment } = body;
    this.logger.log(
      `[Webhook] ${event} → subscription: ${payment.subscription} (eventId: ${body.id})`,
    );

    try {
      // Dedupe: se esse evento já foi processado, não faz nada de novo.
      // Isso é seguro mesmo com concorrência: se dois requests baterem
      // ao mesmo tempo, o segundo insert vai colidir na unique constraint
      // e cair no catch abaixo, sem duplicar processamento.
      await this.prisma.webhookLog.create({
        data: {
          asaasEventId: body.id,
          event,
          asaasPaymentId: payment.id,
          asaasSubscriptionId: payment.subscription,
          payload: body as unknown as Prisma.InputJsonValue,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        this.logger.warn(`[Webhook] Evento duplicado ignorado: ${body.id}`);
        return { received: true };
      }
      throw err;
    }

    const subscription = await this.prisma.subscription.findFirst({
      where: { asaasSubscriptionId: payment.subscription },
    });

    if (!subscription) {
      this.logger.warn(
        `[Webhook] Subscription não encontrada: ${payment.subscription}`,
      );
      // Retornar 200 aqui é intencional só quando a assinatura de fato
      // não existe (evento de outra origem). Se isso disparar para uma
      // assinatura que você ACABOU de criar, é sinal de corrida entre
      // o subscribe() e a entrega do webhook — vale investigar.
      return { received: true };
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.payment.upsert({
          where: { asaasPaymentId: payment.id },
          update: {
            status: payment.status,
            value: payment.value,
            dueDate: new Date(payment.dueDate),
            paidAt: event === 'PAYMENT_RECEIVED' ? new Date() : null,
          },
          create: {
            asaasPaymentId: payment.id,
            asaasSubscriptionId: payment.subscription,
            companyId: subscription.companyId,
            subscriptionId: subscription.id,
            value: payment.value,
            status: payment.status,
            billingType: null,
            dueDate: new Date(payment.dueDate),
            paidAt: event === 'PAYMENT_RECEIVED' ? new Date() : null,
          },
        });

        await this.processEvent(tx, event, subscription, payment);
      });
    } catch (err) {
      this.logger.error(
        `[Webhook] Falha ao processar ${event} (eventId: ${body.id}, subscription: ${payment.subscription}): ${err?.message}`,
        err?.stack,
      );
      // Propaga o 500: queremos que o Asaas reentregue esse evento,
      // já que agora o dedupe garante que não vamos duplicar efeitos
      // quando ele reentregar com sucesso.
      throw err;
    }

    return { received: true };
  }

  private async processEvent(
    tx: Prisma.TransactionClient,
    event: AsaasEvent,
    subscription: {
      id: number;
      companyId: number;
      isAnnual: boolean;
      endDate: Date | null;
    },
    payment: AsaasWebhookPayload['payment'],
  ) {
    switch (event) {
      case 'PAYMENT_CONFIRMED':
      case 'PAYMENT_RECEIVED': {
        const now = new Date();

        // Nunca deixa o acesso "andar pra trás": se a assinatura ainda
        // está dentro do período pago, estende a partir do endDate atual;
        // se já venceu (ou é a primeira ativação), estende a partir de agora.
        const base =
          subscription.endDate && subscription.endDate > now
            ? subscription.endDate
            : now;

        const endDate = new Date(base);
        if (subscription.isAnnual) {
          endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
          endDate.setMonth(endDate.getMonth() + 1);
        }

        await tx.subscription.update({
          where: { id: subscription.id },
          data: { active: true, endDate, canceledAt: null },
        });

        await tx.usageRecord.upsert({
          where: {
            companyId_year_month: {
              companyId: subscription.companyId,
              year: now.getFullYear(),
              month: now.getMonth() + 1,
            },
          },
          update: {},
          create: {
            companyId: subscription.companyId,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
          },
        });

        this.logger.log(
          `[Webhook] Plano ATIVADO → company ${subscription.companyId}, endDate ${endDate.toISOString()}`,
        );
        break;
      }

      case 'PAYMENT_OVERDUE': {
        await tx.subscription.update({
          where: { id: subscription.id },
          data: { active: false },
        });
        this.logger.warn(
          `[Webhook] Plano SUSPENSO (vencido) → company ${subscription.companyId}`,
        );
        break;
      }

      case 'PAYMENT_REFUNDED':
      case 'PAYMENT_CHARGEBACK_REQUESTED': {
        await tx.subscription.update({
          where: { id: subscription.id },
          data: { active: false },
        });
        this.logger.warn(
          `[Webhook] Plano CANCELADO (${event}) → company ${subscription.companyId}`,
        );
        break;
      }

      case 'SUBSCRIPTION_DELETED': {
        await tx.subscription.updateMany({
          where: { asaasSubscriptionId: payment.subscription },
          data: { active: false, endDate: new Date() },
        });
        this.logger.warn(
          `[Webhook] Assinatura DELETADA → ${payment.subscription}`,
        );
        break;
      }

      default:
        this.logger.log(`[Webhook] Evento ignorado: ${event}`);
    }
  }

  private isValidToken(
    received: string | undefined,
    expected: string | undefined,
  ): boolean {
    if (!received || !expected) return false;
    const a = Buffer.from(received);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  }
}
