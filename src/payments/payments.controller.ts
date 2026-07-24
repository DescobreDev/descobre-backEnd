import {
    Controller, Post, Body, Req, UseGuards, Get,
    BadRequestException, HttpCode, HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AsaasService } from './asaas.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlanGuard } from '../guards/plan.guard';

@Controller('payments/asaas')
@UseGuards(AuthGuard('jwt'))
export class PaymentsController {
    constructor(
        private readonly asaas: AsaasService,
        private readonly prisma: PrismaService,
    ) { }

    @Post('customer')
    @HttpCode(HttpStatus.CREATED)
    async createCustomer(@Req() req, @Body() body: {
        name: string;
        cpfCnpj: string;
        email: string;
        mobilePhone: string;
    }) {
        const companyId = req.user.companyId;

        if (!companyId) throw new BadRequestException('Empresa não vinculada.');

        const company = await this.prisma.company.findUnique({ where: { id: companyId } });
        if (company?.asaasCustomerId) {
            return { customerId: company.asaasCustomerId };
        }

        const { id: customerId } = await this.asaas.createCustomer(body);


        console.log('ASAAS RESPONSE:', customerId);


        await this.prisma.company.update({
            where: { id: companyId },
            data: { asaasCustomerId: customerId },
        });

        return { customerId };
    }

    @Post('cancel')
    @HttpCode(HttpStatus.OK)
    async cancelSubscription(@Req() req) {
        const companyId = req.user.companyId;
        if (!companyId) throw new BadRequestException('Empresa não vinculada.');

        const subscription = await this.prisma.subscription.findUnique({
            where: { companyId },
        });

        if (!subscription) throw new BadRequestException('Nenhuma assinatura ativa.');
        if (!subscription.active) throw new BadRequestException('Assinatura já está inativa.');
        if (!subscription.asaasSubscriptionId) throw new BadRequestException('ID Asaas não encontrado.');

        await this.asaas.cancelSubscription(subscription.asaasSubscriptionId);

        await this.prisma.subscription.update({
            where: { companyId },
            data: {
                canceledAt: new Date(),
                active: true,
            },
        });

        return {
            success: true,
            message: 'Assinatura cancelada. Acesso mantido até o fim do período.',
            accessUntil: subscription.endDate,
        };
    }

    @Post('tokenize')
    @HttpCode(HttpStatus.CREATED)
    async tokenizeCard(@Req() req, @Body() body: {
        customerId: string;
        creditCard: {
            holderName: string;
            number: string;
            expiryMonth: string;
            expiryYear: string;
            ccv: string;
        };
        creditCardHolderInfo: {
            name: string;
            cpfCnpj: string;
            email: string;
            postalCode: string;
            addressNumber: string;
            phone: string;
        };
    }) {
        const companyId = req.user.companyId;
        if (!companyId) throw new BadRequestException('Empresa não vinculada.');

        const result = await this.asaas.tokenizeCard(body);

        await this.prisma.cardToken.upsert({
            where: { companyId },
            update: {
                token: result.creditCardToken,
                lastFour: result.creditCardNumber.slice(-4),
                brand: result.creditCardBrand,
            },
            create: {
                companyId,
                token: result.creditCardToken,
                lastFour: result.creditCardNumber.slice(-4),
                brand: result.creditCardBrand,
            },
        });

        return {
            creditCardToken: result.creditCardToken,
            creditCardNumber: result.creditCardNumber,
            creditCardBrand: result.creditCardBrand,
        };
    }

    @Post('subscribe')
    @HttpCode(HttpStatus.CREATED)
    async subscribe(@Req() req, @Body() body: { planId: number; creditCardToken: string; isAnnual: boolean }) {
        const companyId = req.user.companyId;
        if (!companyId) throw new BadRequestException('Empresa não vinculada.');

        const company = await this.prisma.company.findUnique({ where: { id: companyId } });
        if (!company?.asaasCustomerId) throw new BadRequestException('Customer Asaas não criado.');

        const plan = await this.prisma.plan.findUnique({ where: { id: body.planId } });
        if (!plan) throw new BadRequestException('Plano não encontrado.');

        const { id: asaasSubId, status } = await this.asaas.createSubscription({
            customerId: company.asaasCustomerId,
            creditCardToken: body.creditCardToken,
            planId: plan.id,
            value: body.isAnnual ? Number(plan.annualPrice) : Number(plan.price),
            description: body.isAnnual ? `Plano ${plan.name} - Anual` : `Plano ${plan.name} - Mensal`,
            isAnnual: body.isAnnual,
        });

        await this.prisma.subscription.upsert({
            where: { companyId },
            update: {
                asaasSubscriptionId: asaasSubId,
                planId: plan.id,
                active: false,
                isAnnual: body.isAnnual ?? false,
                canceledAt: null
            },
            create: {
                companyId,
                planId: plan.id,
                asaasSubscriptionId: asaasSubId,
                isAnnual: body.isAnnual ?? false,
                active: false,
                canceledAt: null,
                endDate: new Date(),
            },
        });

        return { success: true, status };
    }


    @Get('history')
    async getPaymentHistory(@Req() req) {
        const companyId = req.user.companyId;

        if (!companyId) {
            throw new BadRequestException('Empresa não vinculada.');
        }

        const payments = await this.prisma.payment.findMany({
            where: { companyId },
            orderBy: { createdAt: 'desc' },
            include: {
                subscription: {
                    include: {
                        plan: true,
                    },
                },
            },
        });

        return payments.map(p => ({
            id: p.id,
            asaasId: p.asaasPaymentId,
            value: Number(p.value),
            status: p.status,
            dueDate: p.dueDate,
            paidAt: p.paidAt,
            plan: p.subscription?.plan?.name,
        }));
    }
}