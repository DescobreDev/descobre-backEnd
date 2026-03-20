import { Injectable, BadRequestException, InternalServerErrorException  } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.plan.findMany({
      where: { active: true },
      orderBy: { price: 'asc' },
    });
  }

  async subscribePlan(companyId: number, planId: number) {
      if (!companyId) {
        throw new BadRequestException('Você precisa ter uma empresa vinculada para assinar um plano.');
      }

      const plan = await this.prisma.plan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        throw new BadRequestException('Plano não encontrado');
      }
    
    try {
      const subscription = await this.prisma.subscription.upsert({
        where: { companyId },
        update: {
          planId,
          startDate: new Date(),
          endDate: null,
          active: true,
        },
        create: {
          companyId,
          planId,
          active: true,
        },
      });

      const now = new Date();

      await this.prisma.usageRecord.upsert({
        where: {
          companyId_year_month: {
            companyId,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
          },
        },
        update: {},
        create: {
          companyId,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
      });

      return subscription;

    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('Erro ao assinar plano');
    }
  }
}