import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type UsageResource = 'jobsUsed' | 'aiResumeUsed' | 'aiSalaryUsed' | 'interviewsUsed';

@Injectable()
export class UsageService {
  constructor(private prisma: PrismaService) { }

  async checkAndIncrement(companyId: number, resource: UsageResource) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const subscription = await this.prisma.subscription.findUnique({
      where: { companyId },
      include: { plan: true },
    });

    if (!subscription || !subscription.active) {
      throw new BadRequestException('Empresa sem plano ativo.');
    }

    const usage = await this.prisma.usageRecord.findUnique({
      where: {
        companyId_year_month: { companyId, year, month },
      },
    });

    if (!usage) {
      throw new BadRequestException('Registro de uso não encontrado para este mês.');
    }

    const limits: Record<UsageResource, number> = {
      jobsUsed: subscription.plan.maxJobs,
      aiResumeUsed: subscription.plan.maxAiResume,
      aiSalaryUsed: subscription.plan.maxAiSalary,
      interviewsUsed: subscription.plan.maxInterviews,
    };

    if (usage[resource] >= limits[resource]) {
      throw new BadRequestException(
        `Limite do plano atingido para este recurso.`
      );
    }

    await this.prisma.usageRecord.update({
      where: {
        companyId_year_month: { companyId, year, month },
      },
      data: { [resource]: { increment: 1 } },
    });
  }

  async decrement(companyId: number, resource: UsageResource) {
    const now = new Date();

    const usage = await this.prisma.usageRecord.findUnique({
      where: {
        companyId_year_month: {
          companyId,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
      },
    });

    if (!usage) return;

    if (usage[resource] <= 0) return;

    await this.prisma.usageRecord.update({
      where: {
        companyId_year_month: {
          companyId,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
      },
      data: {
        [resource]: { decrement: 1 },
      },
    });
  }

  async getUsage(companyId: number) {
    const now = new Date();

    const subscription = await this.prisma.subscription.findUnique({
      where: { companyId },
      include: { plan: true },
    });

    if (!subscription) {
      throw new BadRequestException('Empresa sem plano ativo.');
    }

    const usage = await this.prisma.usageRecord.findUnique({
      where: {
        companyId_year_month: {
          companyId,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        },
      },
    });

    return {
      jobsUsed: { used: usage?.jobsUsed ?? 0, limit: subscription.plan.maxJobs },
      aiResumeUsed: { used: usage?.aiResumeUsed ?? 0, limit: subscription.plan.maxAiResume },
      aiSalaryUsed: { used: usage?.aiSalaryUsed ?? 0, limit: subscription.plan.maxAiSalary },
      interviewsUsed: { used: usage?.interviewsUsed ?? 0, limit: subscription.plan.maxInterviews },
    };
  }
}