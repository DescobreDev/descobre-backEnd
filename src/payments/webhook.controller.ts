import {
    Controller, Post, Body, Headers,
    UnauthorizedException, HttpCode, HttpStatus, Logger,
} from '@nestjs/common';
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
    ) { }

    @Post('asaas')
    @HttpCode(HttpStatus.OK)
    async handleAsaas(
        @Body() body: AsaasWebhookPayload,
        @Headers('asaas-access-token') token: string,
    ) {

        const expectedToken = this.config.get<string>('ASAAS_WEBHOOK_TOKEN');
        if (token !== expectedToken) {
            this.logger.warn('[Webhook] Token inválido recebido');
            throw new UnauthorizedException('Token inválido.');
        }

        const { event, payment } = body;
        this.logger.log(`[Webhook] ${event} → subscription: ${payment.subscription}`);

        await this.prisma.webhookLog.create({
            data: {
                event,
                asaasPaymentId: payment.id,
                asaasSubscriptionId: payment.subscription,
                payload: body as any,
            },
        });

        const subscription = await this.prisma.subscription.findFirst({
            where: { asaasSubscriptionId: payment.subscription },
        });

        if (!subscription) {
            this.logger.warn(`[Webhook] Subscription não encontrada: ${payment.subscription}`);
            return { received: true };
        }

        await this.prisma.payment.upsert({
            where: {
                asaasPaymentId: payment.id,
            },
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

        switch (event) {
            case 'PAYMENT_CONFIRMED':
            case 'PAYMENT_RECEIVED': {
                if (!subscription) {
                    this.logger.warn(`[Webhook] Subscription não encontrada, ignorando ativação.`);
                    return { received: true };
                }

                const endDate = new Date(payment.dueDate);

                if (subscription.isAnnual) {
                    endDate.setFullYear(endDate.getFullYear() + 1);
                } else {
                    endDate.setMonth(endDate.getMonth() + 1);
                }

                await this.prisma.subscription.update({
                    where: { id: subscription.id },
                    data: { active: true, endDate, canceledAt: null },
                });

                const now = new Date();

                await this.prisma.usageRecord.upsert({
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

                this.logger.log(`[Webhook] Plano ATIVADO → company ${subscription.companyId}`);
                break;
            }

            case 'PAYMENT_OVERDUE': {
                await this.prisma.subscription.update({
                    where: { id: subscription.id },
                    data: { active: false },
                });

                this.logger.warn(`[Webhook] Plano SUSPENSO (vencido) → company ${subscription.companyId}`);
                break;
            }

            case 'PAYMENT_REFUNDED':
            case 'PAYMENT_CHARGEBACK_REQUESTED': {
                await this.prisma.subscription.update({
                    where: { id: subscription.id },
                    data: { active: false },
                });

                this.logger.warn(`[Webhook] Plano CANCELADO (${event}) → company ${subscription.companyId}`);
                break;
            }

            case 'SUBSCRIPTION_DELETED': {
                await this.prisma.subscription.updateMany({
                    where: { asaasSubscriptionId: payment.subscription },
                    data: { active: false, endDate: new Date() },
                });

                this.logger.warn(`[Webhook] Assinatura DELETADA → ${payment.subscription}`);
                break;
            }

            default:
                this.logger.log(`[Webhook] Evento ignorado: ${event}`);
        }

        return { received: true };
    }
}