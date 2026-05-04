import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsageService } from '../usage/usage.service';
import { GeminiService } from '../gemini/gemini.service';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private usageService: UsageService,
    private geminiService: GeminiService,
  ) { }

  async create(companyId: number, data: any) {
    if (!companyId) throw new BadRequestException('Empresa não vinculada.');

    await this.usageService.checkAndIncrement(companyId, 'jobsUsed');

    const {
      benefitIds = [],
      customBenefits = [],
      sectorId,
      positionId,
      companyId: _,
      ...jobData
    } = data;

    if (jobData.deadline) {
      jobData.deadline = new Date(jobData.deadline);
    }

    const [sector, position] = await Promise.all([
      this.prisma.sector.findUnique({ where: { id: sectorId } }),
      this.prisma.position.findUnique({ where: { id: positionId } }),
    ]);

    const profile = await this.geminiService.generateJobProfile({
      title: jobData.title,
      sector: sector?.name ?? '',
      position: position?.name ?? '',
      description: jobData.description,
    });

    console.log(profile);

    return this.prisma.job.create({
      data: {
        ...jobData,
        company: { connect: { id: companyId } },
        sectorId,
        positionId,
        benefits: {
          create: benefitIds.map((benefitId: number) => ({ benefitId })),
        },
        customBenefits,
        profile: {
          create: {
            analyst: profile.analyst,
            communicator: profile.communicator,
            executor: profile.executor,
            planner: profile.planner,
            priority: profile.priority,
          },
        },
      },
      include: {
        benefits: { include: { benefit: true } },
        profile: true,
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
      include: {
        profile: true,
      },
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

    const dataWithScore = applications.map((app) => {
      console.log('JOB PROFILE:', job.profile);
      console.log('CANDIDATE:', app.candidate);

      const compatibility = this.calculateCompatibility(job.profile, app.candidate);

      console.log('RESULT:', compatibility);

      return {
        ...app,
        compatibility,
      };
    });

    return {
      jobTitle: job.title,
      data: dataWithScore,
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
      include: { profile: true },
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
        history: { orderBy: { changedAt: 'desc' } },
      },
    });
    if (!application) throw new NotFoundException('Candidatura não encontrada');

    const compatibility = this.calculateCompatibility(job.profile, application.candidate);

    return { ...application, compatibility, jobProfile: job.profile };
  }

  private calculateCompatibility(jobProfile, candidate) {
    if (!jobProfile) return 0;

    const safe = (v: number) => v ?? 0;
    const total = 10;

    const dimensions = [
      { job: safe(jobProfile.analyst), candidate: safe(candidate.profileAnalyst) },
      { job: safe(jobProfile.communicator), candidate: safe(candidate.profileCommunicator) },
      { job: safe(jobProfile.executor), candidate: safe(candidate.profileExecutor) },
      { job: safe(jobProfile.planner), candidate: safe(candidate.profilePlanner) },
    ];

    let penalty = 0;

    for (const dim of dimensions) {
      const diff = Math.abs(dim.job - dim.candidate);
      const weight = dim.job / total;
      penalty += diff * weight;
    }

    const compatibility = (1 - penalty / 5) * 100;

    return Math.max(0, Math.round(compatibility));
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

    await this.prisma.$transaction([
      this.prisma.application.update({
        where: { id: applicationId },
        data: { status },
      }),
      this.prisma.applicationHistory.create({
        data: { applicationId, status, note },
      }),
      
      ...(status === 'APROVADO' ? [
        this.prisma.job.update({
          where: { id: jobId },
          data: { status: 'INACTIVE', active: false },
        }),
      ] : []),
    ]);

    return { success: true };
  }

  async getAllBenefits() {
    return this.prisma.benefit.findMany();
  }

  async findOne(id: number, companyId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        benefits: { include: { benefit: true } },
        profile: true,
      },
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