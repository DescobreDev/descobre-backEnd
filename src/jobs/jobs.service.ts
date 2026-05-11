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

    let profile: { analyst: number; communicator: number; executor: number; planner: number; priority: string } | null = null;
    try {
      profile = await this.geminiService.generateJobProfile({
        title: jobData.title,
        sector: sector?.name ?? '',
        position: position?.name ?? '',
        description: jobData.description,
      });
    } catch (err) {
      console.warn('Falha ao gerar perfil com Gemini, vaga será criada sem perfil.', err?.message);
    }

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
        ...(profile && {
          profile: {
            create: {
              analyst: profile.analyst,
              communicator: profile.communicator,
              executor: profile.executor,
              planner: profile.planner,
              priority: profile.priority,
            },
          },
        }),
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
      where: { id: jobId, companyId },
      include: { profile: true },
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
              id: true, name: true, email: true, phone: true,
              profileAnalyst: true, profileCommunicator: true,
              profileExecutor: true, profilePlanner: true,
            },
          },
        },
      }),
      this.prisma.application.count({ where }),
    ]);

    const dataWithScore = applications.map((app) => ({
      ...app,
      compatibility: this.calculateCompatibility(job.profile, app.candidate),
    }));

    const hiredApplication = job.status === 'HIRED'
      ? await this.prisma.application.findFirst({
        where: { jobId, status: 'APROVADO' },
        include: {
          candidate: { select: { id: true, name: true, email: true } },
        },
        orderBy: { updatedAt: 'desc' },
      })
      : null;

    return {
      jobTitle: job.title,
      jobStatus: job.status,
      hiredCandidate: hiredApplication
        ? {
          id: hiredApplication.id,
          name: hiredApplication.candidate.name,
          email: hiredApplication.candidate.email,
          hiredAt: hiredApplication.updatedAt,
        }
        : null,
      data: dataWithScore,
      pagination: {
        page, limit, total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findCandidate(jobId: number, applicationId: number, companyId: number) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, companyId },
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
        interviewEvents: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!application) throw new NotFoundException('Candidatura não encontrada');

    const compatibility = this.calculateCompatibility(job.profile, application.candidate);

    return { ...application, compatibility, jobProfile: job.profile, jobStatus: job.status };
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
    interviewData?: {
      type: 'presencial' | 'online';
      scheduledAt: Date;
      meetingLink?: string;
      address?: string;
    },
  ) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, companyId, active: true },
    });
    if (!job) throw new NotFoundException('Vaga não encontrada');

    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, jobId },
    });
    if (!application) throw new NotFoundException('Candidatura não encontrada');

    await this.prisma.$transaction(async (tx) => {
      await tx.application.update({
        where: { id: applicationId },
        data: { status },
      });

      await tx.applicationHistory.create({
        data: {
          applicationId,
          status,
          note: status !== 'ENTREVISTA' ? note : undefined,
        },
      });

      if (status === 'ENTREVISTA' && interviewData) {
        await tx.interviewEvent.create({
          data: {
            applicationId,
            type: 'INVITE_SENT',
            scheduledAt: new Date(interviewData.scheduledAt),
            meetingLink: interviewData.meetingLink ?? null,
            address: interviewData.address ?? null,
            interviewType: interviewData.type,
            message: note ?? null,
          },
        });
      }

      if (status === 'APROVADO') {
        await tx.job.update({
          where: { id: jobId },
          data: { status: 'HIRED', active: false },
        });

        const pending = await tx.application.findMany({
          where: {
            jobId,
            id: { not: applicationId },
            status: { notIn: ['REPROVADO', 'DESISTIU', 'APROVADO'] },
          },
          select: { id: true, status: true },
        });

        if (pending.length > 0) {
          await tx.application.updateMany({
            where: { id: { in: pending.map(a => a.id) } },
            data: { status: 'RECEBIDA' },
          });

          await tx.applicationHistory.createMany({
            data: pending.map(a => ({
              applicationId: a.id,
              status: 'RECEBIDA' as ApplicationStatus,
              note: 'Vaga encerrada por contratação',
            })),
          });
        }
      }
    });

    return { success: true };
  }

  async respondToInterview(
    applicationId: number,
    response: 'CONFIRMED' | 'DECLINED' | 'RESCHEDULED',
    note?: string,
    proposedAt?: Date,
  ) {
    return this.prisma.interviewEvent.create({
      data: {
        applicationId,
        type: response,
        note,
        proposedAt,
      },
    });
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

    const sector = await this.prisma.sector.findUnique({ where: { id: job.sectorId } });
    const position = await this.prisma.position.findUnique({ where: { id: job.positionId } });

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

        const wasHired = job.status === 'HIRED';

        const applications = await tx.application.findMany({
          where: { jobId: id },
          select: { id: true, status: true },
        });

        const toReset = applications.filter(a => a.status !== 'RECEBIDA');

        if (toReset.length > 0) {
          await tx.application.updateMany({
            where: { jobId: id, id: { in: toReset.map(a => a.id) } },
            data: { status: 'RECEBIDA' },
          });

          await tx.applicationHistory.createMany({
            data: toReset.map(a => ({
              applicationId: a.id,
              status: 'RECEBIDA' as ApplicationStatus,
              note: wasHired
                ? `Vaga reaberta após contratação — processo reiniciado (status anterior: ${a.status})`
                : `Vaga reaberta — processo reiniciado (status anterior: ${a.status})`,
            })),
          });
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
      select: { id: true, name: true },
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
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!sector) throw new NotFoundException(`Área ${sectorId} não encontrada`);

    return sector;
  }
}