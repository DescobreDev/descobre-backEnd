import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
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
      companyId: _,
      sectorId,
      positionId,
      ...jobData
    } = data;

    if (jobData.deadline) {
      jobData.deadline = new Date(jobData.deadline);
    }

    return this.prisma.job.create({
      data: {
        ...jobData,
        company: {
          connect: { id: companyId },
        },
        sectorId,
        positionId,

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

  async findCandidates(jobId: number, companyId: number, page = 1, limit = 10, status?: ApplicationStatus) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, companyId, active: true },
    });
    if (!job) throw new NotFoundException('Vaga não encontrada');

    const skip = (page - 1) * limit;

    const where = {
      jobId,
      ...(status ? { status } : {}),
    };

    const [applications, total] = await Promise.all([
      this.prisma.application.findMany({
        where,
        orderBy: { appliedAt: 'desc' },
        take: limit,
        skip,
        include: {
          candidate: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              profileAnalyst: true,
              profileCommunicator: true,
              profileExecutor: true,
              profilePlanner: true,
            },
          },
        },
      }),
      this.prisma.application.count({ where }),
    ]);

    return {
      jobTitle: job.title,
      data: applications,
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

  async findCandidate(jobId: number, applicationId: number, companyId: number) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, companyId, active: true },
    });
    if (!job) throw new NotFoundException('Vaga não encontrada');

    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, jobId },
      include: {
        candidate: {
          include: {
            resume: {
              include: {
                experiences: true,
                educations: true,
                skills: true,
                languages: true,
                extras: true,
              },
            },
          },
        },
        history: {
          orderBy: { changedAt: 'desc' },
        },
      },
    });
    if (!application) throw new NotFoundException('Candidatura não encontrada');

    return application;
  }

  async updateApplicationStatus(
    jobId: number,
    applicationId: number,
    companyId: number,
    status: ApplicationStatus,
    note?: string,
  ) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, companyId, active: true },
    });
    if (!job) throw new NotFoundException('Vaga não encontrada');

    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, jobId },
    });
    if (!application) throw new NotFoundException('Candidatura não encontrada');

    const [updated] = await this.prisma.$transaction([
      this.prisma.application.update({
        where: { id: applicationId },
        data: { status },
      }),
      this.prisma.applicationHistory.create({
        data: { applicationId, status, note },
      }),
    ]);

    return updated;
  }

  async getAllBenefits() {
    return this.prisma.benefit.findMany();
  }

  async findOne(id: number, companyId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { benefits: { include: { benefit: true } } },
    });

    if (!job) throw new NotFoundException('Vaga não encontrada.');
    if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');

    const sector = await this.prisma.sector.findUnique({
      where: { id: job.sectorId },
    });

    const position = await this.prisma.position.findUnique({
      where: { id: job.positionId },
    });

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
      sectorId,
      positionId,
      companyId: _,
      ...jobData
    } = data;

    if (jobData.deadline) {
      jobData.deadline = new Date(jobData.deadline);
    }

    return this.prisma.job.update({
      where: { id },
      data: {
        ...jobData,
        sectorId,
        positionId,
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

  async updateStatusJob(id: number, companyId: number, status: 'ACTIVE' | 'INACTIVE') {
    return this.prisma.$transaction(async (tx) => {
      const job = await tx.job.findUnique({ where: { id } });

      if (!job) throw new NotFoundException('Vaga não encontrada.');
      if (job.companyId !== companyId) throw new ForbiddenException('Sem permissão.');
      if (job.status === status) return job;

      if (status === 'ACTIVE') {
        const subscription = await tx.subscription.findUnique({
          where: { companyId },
          include: { plan: true },
        });

        if (!subscription || !subscription.active) {
          throw new BadRequestException('Empresa sem plano ativo.');
        }
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

      if (!job.active) return job;

      await tx.job.update({
        where: { id },
        data: { active: false, status: 'INACTIVE' },
      });

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