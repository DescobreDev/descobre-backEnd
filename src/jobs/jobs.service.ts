import { Injectable, BadRequestException, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { ApplicationStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsageService } from '../usage/usage.service';
import { GeminiService } from '../gemini/gemini.service';
import { calculateMatchScore } from './match-score.util';

export interface FindJobsForCandidateParams {
  page: number;
  limit: number;
  search?: string;
  workFormat?: 'REMOTE' | 'HYBRID' | 'ONSITE';
  contractType?: 'CLT' | 'PJ' | 'FREELANCER';
  jobType?: 'STANDARD' | 'INTERNSHIP' | 'TRAINEE';
  experienceLevel?: 'ESTAGIO' | 'JUNIOR' | 'PLENO' | 'SENIOR' | 'ESPECIALISTA';
  affirmative?: 'NOT_INFORMED' | 'PCD' | 'WOMEN' | 'FIFTY_PLUS' | 'LGBTQIAPN';
  sectorId?: number;
  positionId?: number;
  benefitIds?: number[];
  salaryMin?: number;
  salaryMax?: number;
  city?: string;
  state?: string;
  candidateId?: number;
}

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
          // profile: {
          //   create: {
          //     analyst: profile.analyst,
          //     communicator: profile.communicator,
          //     executor: profile.executor,
          //     planner: profile.planner,
          //     priority: profile.priority,
          //   },
          // },
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

  async findAllCandidates() {
    return this.prisma.candidate.findMany({
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
    });
  }

  async findCandidates(jobId: number, companyId: number, page = 1, limit = 10, status?: ApplicationStatus) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, companyId },
      include: { profile: true },
    });

    if (!job) throw new NotFoundException('Vaga não encontrada');

    const skip = (page - 1) * limit;
    const where = { jobId, ...(status ? { status } : {}) };

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
              profileType: true,
              profileTypeSecondary: true,
              desiredPositionId: true,
              desiredSectorId: true,
              desiredSalaryMin: true,
              desiredSalaryMax: true,
              contractTypes: true,
              city: true,
              state: true,
              acceptsTravel: true,
              experienceLevel: true,
              affirmativeTypes: true,
            },
          },
        },
      }),
      this.prisma.application.count({ where }),
    ]);

    const dataWithScore = applications.map((app) => {
      const match = calculateMatchScore({
        job: {
          positionId: job.positionId,
          sectorId: job.sectorId,
          workFormat: job.workFormat,
          contractType: job.contractType,
          salary: job.salary ? Number(job.salary) : null,
          city: job.city,
          state: job.state,
          affirmative: job.affirmative,
        },
        jobProfile: job.profile
          ? {
            primaryProfile: job.profile.primaryProfile,
            secondaryProfile: job.profile.secondaryProfile,
            experienceLevel: job.profile.experienceLevel,
          }
          : null,
        candidate: {
          ...app.candidate,
          desiredSalaryMin: app.candidate.desiredSalaryMin ? Number(app.candidate.desiredSalaryMin) : null,
          desiredSalaryMax: app.candidate.desiredSalaryMax ? Number(app.candidate.desiredSalaryMax) : null,
        },
      });

      return { ...app, compatibility: match.finalScore, matchEligible: match.eligible };
    });

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
              include: { experiences: true, educations: true, skills: true, languages: true, extras: true },
            },
            desiredSector: true,
            desiredPosition: true,
          },
        },
        history: { orderBy: { changedAt: 'desc' } },
        interviewEvents: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!application) throw new NotFoundException('Candidatura não encontrada');

    const match = calculateMatchScore({
      job: {
        positionId: job.positionId,
        sectorId: job.sectorId,
        workFormat: job.workFormat,
        contractType: job.contractType,
        salary: job.salary ? Number(job.salary) : null,
        city: job.city,
        state: job.state,
        affirmative: job.affirmative,
      },
      jobProfile: job.profile
        ? {
          primaryProfile: job.profile.primaryProfile,
          secondaryProfile: job.profile.secondaryProfile,
          experienceLevel: job.profile.experienceLevel,
        }
        : null,
      candidate: {
        ...application.candidate,
        desiredSalaryMin: application.candidate.desiredSalaryMin ? Number(application.candidate.desiredSalaryMin) : null,
        desiredSalaryMax: application.candidate.desiredSalaryMax ? Number(application.candidate.desiredSalaryMax) : null,
      },
    });

    return {
      ...application,
      compatibility: match.finalScore,
      matchEligible: match.eligible,
      matchIneligibleReason: match.reasonIneligible,
      matchBreakdown: match.breakdown,
      jobProfile: job.profile,
      jobStatus: job.status,
    };
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
          application: {
            connect: {
              id: applicationId,
            },
          },
          status,
          actor: 'COMPANY',
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
            interviewType:
              interviewData.type === 'online'
                ? 'ONLINE'
                : 'PRESENCIAL',
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
              status: 'RECEBIDA',
              actor: 'SYSTEM',
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
    return this.prisma.benefit.findMany({ orderBy: { name: 'asc' } });
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
              status: 'RECEBIDA',
              actor: 'SYSTEM',
              note:
                wasHired
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

  async attachCandidate(jobId: number, candidateId: number, companyId: number) {
    const job = await this.prisma.job.findFirst({
      where: {
        id: jobId,
        companyId,
      },
    });

    if (!job) throw new NotFoundException('Vaga não encontrada');

    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) throw new NotFoundException('Candidato não encontrado');

    const exists = await this.prisma.application.findUnique({
      where: { candidateId_jobId: { candidateId, jobId } },
    });

    if (exists) throw new ConflictException('Candidato já está na vaga');

    return this.prisma.application.create({
      data: {
        jobId,
        candidateId,
        history: {
          create: {
            status: 'RECEBIDA',
            actor: 'COMPANY',
            note: 'Candidato adicionado manualmente',
          },
        },
      },
      include: { candidate: true },
    });
  }

  async findForCandidates(params: FindJobsForCandidateParams) {
    const {
      page = 1,
      limit = 10,
      search,
      workFormat,
      contractType,
      jobType,
      experienceLevel,
      affirmative,
      sectorId,
      positionId,
      benefitIds,
      salaryMin,
      salaryMax,
      city,
      state,
      candidateId,
    } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {
      active: true,
      status: 'ACTIVE',
      visible: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { company: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }),
      ...(workFormat && { workFormat }),
      ...(contractType && { contractType }),
      ...(jobType && { jobType }),
      ...(affirmative && { affirmative }),
      ...(sectorId && { sectorId }),
      ...(positionId && { positionId }),
      ...(city && { city: { equals: city, mode: 'insensitive' } }),
      ...(state && { state: { equals: state, mode: 'insensitive' } }),
      ...(experienceLevel && { profile: { experienceLevel } }),
      ...(benefitIds && benefitIds.length > 0 && {
        benefits: { some: { benefitId: { in: benefitIds } } },
      }),
      ...((salaryMin !== undefined || salaryMax !== undefined) && {
        salary: {
          ...(salaryMin !== undefined && { gte: salaryMin }),
          ...(salaryMax !== undefined && { lte: salaryMax }),
        },
      }),
    };

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        select: {
          id: true,
          title: true,
          description: true,
          salary: true,
          workFormat: true,
          contractType: true,
          jobType: true,
          city: true,
          state: true,
          deadline: true,
          createdAt: true,
          sectorId: true,
          positionId: true,
          company: {
            select: {
              id: true,
              name: true,
              city: true,
              state: true,
            },
          },
          benefits: {
            select: { benefit: { select: { name: true } } },
          },
          profile: {
            select: { experienceLevel: true },
          },
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    let appliedJobIds = new Set<number>();
    if (candidateId) {
      const applications = await this.prisma.application.findMany({
        where: {
          candidateId,
          jobId: { in: jobs.map((j) => j.id) },
        },
        select: { jobId: true },
      });
      appliedJobIds = new Set(applications.map((a) => a.jobId));
    }

    const formatted = jobs.map(({ profile, ...job }) => ({
      ...job,
      salary: job.salary ? Number(job.salary) : null,
      benefits: job.benefits.map((b) => b.benefit.name),
      experienceLevel: profile?.experienceLevel ?? null,
      alreadyApplied: appliedJobIds.has(job.id),
    }));

    return {
      jobs: formatted,
      total,
      page,
      limit,
    };
  }

  async findOneForCandidate(jobId: number, candidateId?: number) {
    const job = await this.prisma.job.findFirst({
      where: {
        id: jobId,
        active: true,
        status: 'ACTIVE',
        visible: true,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
            about: true,
            employees: true,
            site: true,
          },
        },
        benefits: {
          include: { benefit: true },
        },
      },
    });

    if (!job) throw new NotFoundException('Vaga não encontrada ou indisponível.');

    let alreadyApplied = false;
    let applicationStatus: string | null = null;

    if (candidateId) {
      const application = await this.prisma.application.findUnique({
        where: { candidateId_jobId: { candidateId, jobId } },
        select: { status: true },
      });
      alreadyApplied = !!application;
      applicationStatus = application?.status ?? null;
    }

    return {
      ...job,
      salary: job.salary ? Number(job.salary) : null,
      benefits: job.benefits.map((b) => b.benefit.name),
      customBenefits: job.customBenefits,
      alreadyApplied,
      applicationStatus,
    };
  }

  async findApplicationsForCandidate(
    candidateId: number,
    { page = 1, limit = 10, status }: { page?: number; limit?: number; status?: ApplicationStatus },
  ) {
    const where: Prisma.ApplicationWhereInput = {
      candidateId,
      ...(status ? { status } : {}),
    };

    const [applications, total] = await Promise.all([
      this.prisma.application.findMany({
        where,
        include: {
          job: {
            select: {
              id: true,
              title: true,
              company: {
                select: { id: true, name: true, city: true, state: true },
              },
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.application.count({ where }),
    ]);

    return {
      data: applications.map((a) => ({
        id: a.id,
        jobId: a.job.id,
        jobTitle: a.job.title,
        companyName: a.job.company.name,
        city: a.job.company.city,
        state: a.job.company.state,
        appliedAt: a.appliedAt,
        status: a.status,
      })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async applyToJob(jobId: number, candidateId: number) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId, active: true, status: 'ACTIVE', visible: true },
      select: { id: true, title: true, deadline: true },
    });

    if (!job) throw new NotFoundException('Vaga não encontrada ou indisponível.');

    if (job.deadline && new Date(job.deadline) < new Date()) {
      throw new BadRequestException('O prazo para candidatura desta vaga encerrou.');
    }

    const existing = await this.prisma.application.findUnique({
      where: { candidateId_jobId: { candidateId, jobId } },
    });

    if (existing) throw new ConflictException('Você já se candidatou a esta vaga.');

    const application = await this.prisma.application.create({
      data: {
        candidateId,
        jobId,
        status: 'RECEBIDA',
        history: {
          create: {
            status: 'RECEBIDA',
            actor: 'CANDIDATE',
            note: 'Candidatura realizada pelo app',
          },
        },
      },
      select: {
        id: true,
        status: true,
        appliedAt: true,
        job: {
          select: {
            id: true,
            title: true,
            company: { select: { name: true } },
          },
        },
      },
    });

    return {
      message: 'Candidatura realizada com sucesso!',
      application,
    };
  }

  // --- Detalhe da candidatura para o candidato ---
  async findApplicationDetailForCandidate(applicationId: number, candidateId: number) {
    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, candidateId },
      include: {
        job: {
          include: {
            company: {
              select: { id: true, name: true, city: true, state: true, about: true, site: true },
            },
            profile: true,
            benefits: { include: { benefit: true } },
          },
        },
        history: { orderBy: { changedAt: 'desc' } },
        interviewEvents: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!application) throw new NotFoundException('Candidatura não encontrada.');

    const candidate = await this.prisma.candidate.findUnique({ where: { id: candidateId } });
    if (!candidate) throw new NotFoundException('Candidato não encontrado.');

    const match = calculateMatchScore({
      job: {
        positionId: application.job.positionId,
        sectorId: application.job.sectorId,
        workFormat: application.job.workFormat,
        contractType: application.job.contractType,
        salary: application.job.salary ? Number(application.job.salary) : null,
        city: application.job.city,
        state: application.job.state,
        affirmative: application.job.affirmative,
      },
      jobProfile: application.job.profile
        ? {
          primaryProfile: application.job.profile.primaryProfile,
          secondaryProfile: application.job.profile.secondaryProfile,
          experienceLevel: application.job.profile.experienceLevel,
        }
        : null,
      candidate: {
        ...candidate,
        desiredSalaryMin: candidate.desiredSalaryMin ? Number(candidate.desiredSalaryMin) : null,
        desiredSalaryMax: candidate.desiredSalaryMax ? Number(candidate.desiredSalaryMax) : null,
      },
    });

    return {
      id: application.id,
      status: application.status,
      appliedAt: application.appliedAt,
      updatedAt: application.updatedAt,
      compatibility: match.finalScore,
      job: {
        id: application.job.id,
        title: application.job.title,
        description: application.job.description,
        workFormat: application.job.workFormat,
        contractType: application.job.contractType,
        jobType: application.job.jobType,
        salary: application.job.salary ? Number(application.job.salary) : null,
        city: application.job.city,
        state: application.job.state,
        benefits: application.job.benefits.map((b) => b.benefit.name),
        customBenefits: application.job.customBenefits,
        company: application.job.company,
      },
      history: application.history,
      interviewEvents: application.interviewEvents,
    };
  }

  // --- Candidato responde ao convite de entrevista ---
  async respondToInterviewByCandidate(
    applicationId: number,
    candidateId: number,
    response: 'CONFIRMED' | 'DECLINED' | 'RESCHEDULED',
    note?: string,
    proposedAt?: Date,
  ) {
    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, candidateId },
    });
    if (!application) throw new NotFoundException('Candidatura não encontrada.');
    if (application.status !== 'ENTREVISTA') {
      throw new BadRequestException('Esta candidatura não está em fase de entrevista.');
    }
    if (response === 'RESCHEDULED' && !proposedAt) {
      throw new BadRequestException('Informe a data/horário proposto para remarcação.');
    }

    return this.prisma.$transaction(async (tx) => {
      const event = await tx.interviewEvent.create({
        data: {
          applicationId,
          type: response,
          note,
          proposedAt: response === 'RESCHEDULED' ? new Date(proposedAt as Date) : undefined,
        },
      });

      // Recusar o convite encerra a candidatura
      if (response === 'DECLINED') {
        await tx.application.update({
          where: { id: applicationId },
          data: { status: 'DESISTIU' },
        });
        await tx.applicationHistory.create({
          data: {
            applicationId,
            status: 'DESISTIU',
            actor: 'CANDIDATE',
            note: note ?? 'Candidato recusou o convite para entrevista.',
          },
        });
      }

      return event;
    });
  }

  // --- Candidato cancela a candidatura ---
  async cancelApplication(applicationId: number, candidateId: number) {
    const application = await this.prisma.application.findFirst({
      where: { id: applicationId, candidateId },
    });
    if (!application) throw new NotFoundException('Candidatura não encontrada.');
    if (application.status === 'APROVADO') {
      throw new BadRequestException('Não é possível cancelar uma candidatura já aprovada.');
    }
    if (application.status === 'DESISTIU') {
      return { success: true };
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.application.update({
        where: { id: applicationId },
        data: { status: 'DESISTIU' },
      });
      await tx.applicationHistory.create({
        data: {
          applicationId,
          status: 'DESISTIU',
          actor: 'CANDIDATE',
          note: 'Candidato cancelou a candidatura.',
        },
      });
    });

    return { success: true };
  }
}