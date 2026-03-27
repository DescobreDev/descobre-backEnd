import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsageService } from '../usage/usage.service';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private usageService: UsageService,
  ) { }

  async create(companyId: number, data: any) {
    if (!companyId) throw new BadRequestException('Empresa não vinculada.');

    await this.usageService.checkAndIncrement(companyId, 'jobsUsed');

    const {
      benefitIds = [],
      customBenefits = [],
      sector,
      position,
      ...jobData
    } = data;

    if (jobData.deadline) {
      jobData.deadline = new Date(jobData.deadline);
    }

    return this.prisma.job.create({
      data: {
        ...jobData,
        companyId,

        sectorId: data.sectorId,
        positionId: data.positionId,

        benefits: {
          create: benefitIds.map((benefitId: number) => ({ benefitId })),
        },

        customBenefits,
      },
      include: {
        benefits: { include: { benefit: true } },
      },
    });
  }

  async findAll(companyId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where: { companyId },
        orderBy: { id: 'desc' },
        take: limit,
        skip,
        include: {
          benefits: { include: { benefit: true } },
        },
      }),
      this.prisma.job.count({ where: { companyId } }),
    ]);

    return {
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async getAllBenefits() {
    return this.prisma.benefit.findMany();
  }

  async findOne(id: number, companyId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { benefits: { include: { benefit: true } } },
    });

    const sector = await this.prisma.sector.findUnique({
      where: { id: job.sectorId },
    });

    const position = await this.prisma.position.findUnique({
      where: { id: job.positionId },
    })

    if (!job) throw new NotFoundException('Vaga não encontrada.');

    if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

    return [job, sector, position];
  }

  async update(id: number, companyId: number, data: any) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Vaga não encontrada.');
    if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

    const {
      benefitIds = [],
      customBenefits = [],
      sector,
      position,
      ...jobData
    } = data;

    if (jobData.deadline) {
      jobData.deadline = new Date(jobData.deadline);
    }

    return this.prisma.job.update({
      where: { id },
      data: {
        ...jobData,

        benefits: {
          deleteMany: {},
          create: benefitIds.map((benefitId: number) => ({ benefitId })),
        },

        customBenefits,
      },
      include: {
        benefits: { include: { benefit: true } },
      },
    });
  }

  async updateStatusJob(id: number, companyId: number, status: 'ACTIVE' | 'INACTIVE',) {
    return this.prisma.$transaction(async (tx) => {
      const job = await tx.job.findUnique({ where: { id } });

      if (!job) {
        throw new NotFoundException('Vaga não encontrada.');
      }

      if (job.companyId !== companyId) {
        throw new ForbiddenException('Sem permissão.');
      }

      if (job.status === status) {
        return job;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      if (status === 'INACTIVE') {
        const usage = await tx.usageRecord.findUnique({
          where: {
            companyId_year_month: { companyId, year, month },
          },
        });

        if (usage && usage.jobsUsed > 0) {
          await tx.usageRecord.update({
            where: {
              companyId_year_month: { companyId, year, month },
            },
            data: {
              jobsUsed: { decrement: 1 },
            },
          });
        }
      }

      if (status === 'ACTIVE') {
        const subscription = await tx.subscription.findUnique({
          where: { companyId },
          include: { plan: true },
        });

        if (!subscription || !subscription.active) {
          throw new BadRequestException('Empresa sem plano ativo.');
        }

        const usage = await tx.usageRecord.findUnique({
          where: {
            companyId_year_month: { companyId, year, month },
          },
        });

        if (!usage) {
          throw new BadRequestException('Registro de uso não encontrado.');
        }

        const limit = subscription.plan.maxJobs;

        if (usage.jobsUsed >= limit) {
          throw new BadRequestException('Limite de vagas atingido.');
        }

        await tx.usageRecord.update({
          where: {
            companyId_year_month: { companyId, year, month },
          },
          data: {
            jobsUsed: { increment: 1 },
          },
        });
      }

      return tx.job.update({
        where: { id },
        data: {
          status,
          active: status === 'ACTIVE',
        },
      });
    });
  }

  async remove(id: number, companyId: number) {
    return this.prisma.$transaction(async (tx) => {
      const job = await tx.job.findUnique({ where: { id } });

      if (!job) throw new NotFoundException('Vaga não encontrada.');
      if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

      if (!job.active) {
        return job;
      }

      await tx.job.update({
        where: { id },
        data: { active: false, status: 'INACTIVE' },
      });

      const now = new Date();

      const usage = await tx.usageRecord.findUnique({
        where: {
          companyId_year_month: {
            companyId,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
          },
        },
      });

      if (usage && usage.jobsUsed > 0) {
        await tx.usageRecord.update({
          where: {
            companyId_year_month: {
              companyId,
              year: now.getFullYear(),
              month: now.getMonth() + 1,
            },
          },
          data: {
            jobsUsed: { decrement: 1 },
          },
        });
      }

      return { success: true };
    });
  }

  async findAllSector() {
    return this.prisma.sector.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findPositionsBySector(sectorId: number) {
    const sector = await this.prisma.sector.findUnique({
      where: { id: sectorId },
      select: {
        id: true,
        name: true,
        positions: {
          select: {
            id: true,
            name: true,
          },
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!sector) {
      throw new NotFoundException(`Área ${sectorId} não encontrada`);
    }

    return sector;
  }
}