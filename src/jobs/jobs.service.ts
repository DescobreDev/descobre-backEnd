import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsageService } from '../usage/usage.service';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private usageService: UsageService,
  ) {}

  async create(companyId: number, data: any) {
    if (!companyId) throw new BadRequestException('Empresa não vinculada.');

    await this.usageService.checkAndIncrement(companyId, 'jobsUsed');

    const { benefitIds = [], newBenefits = [], ...jobData } = data;

    const createdBenefits = await Promise.all(
      newBenefits.map((name: string) =>
        this.prisma.benefit.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    const allBenefitIds = [
      ...benefitIds,
      ...createdBenefits.map((b) => b.id),
    ];

    return this.prisma.job.create({
      data: {
        ...jobData,
        companyId,
        benefits: {
          create: allBenefitIds.map((benefitId: number) => ({ benefitId })),
        },
      },
      include: {
        benefits: { include: { benefit: true } },
      },
    });
  }

  async findAll(companyId: number) {
    return this.prisma.job.findMany({
      where: { companyId, active: true },
      orderBy: { createdAt: 'desc' },
      include: {
        benefits: { include: { benefit: true } },
      },
    });
  }

  async findOne(id: number, companyId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { benefits: { include: { benefit: true } } },
    });

    if (!job) throw new NotFoundException('Vaga não encontrada.');

    if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

    return job;
  }

  async update(id: number, companyId: number, data: any) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Vaga não encontrada.');
    if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

    const { benefitIds = [], newBenefits = [], ...jobData } = data;

    const createdBenefits = await Promise.all(
      newBenefits.map((name: string) =>
        this.prisma.benefit.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    const allBenefitIds = [
      ...benefitIds,
      ...createdBenefits.map((b) => b.id),
    ];

    return this.prisma.job.update({
      where: { id },
      data: {
        ...jobData,
        benefits: {
          deleteMany: {},
          create: allBenefitIds.map((benefitId: number) => ({ benefitId })),
        },
      },
      include: {
        benefits: { include: { benefit: true } },
      },
    });
  }

  async remove(id: number, companyId: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Vaga não encontrada.');
    if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

    return this.prisma.job.update({
      where: { id },
      data: { active: false, status: 'INACTIVE' },
    });
  }
}