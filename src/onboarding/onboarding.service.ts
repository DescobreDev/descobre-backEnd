import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompleteOnboardingDto } from './dto/complete-onboarding';

@Injectable()
export class OnboardingService {
  constructor(private readonly prisma: PrismaService) {}

  async getInterests() {
    return this.prisma.interest.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  async getPriorities() {
    return this.prisma.professionalPriority.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getSectors(search?: string) {
    return this.prisma.sector.findMany({
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { name: 'asc' },
      take: 20,
    });
  }

  async getPositions(sectorId: number, search?: string) {
    return this.prisma.position.findMany({
      where: {
        sectorId,
        ...(search
          ? { name: { contains: search, mode: 'insensitive' } }
          : {}),
      },
      orderBy: { name: 'asc' },
      take: 20,
    });
  }

  async complete(candidateId: number, dto: CompleteOnboardingDto) {
    if (!dto.firstJobSeeker && dto.experiences.length === 0) {
      throw new BadRequestException(
        'Informe ao menos uma experiência ou marque "Em busca do primeiro emprego".',
      );
    }

    if (dto.interestIds.length < 1) {
      throw new BadRequestException('Selecione ao menos 1 interesse.');
    }

    if (dto.priorities.length < 3) {
      throw new BadRequestException('Selecione ao menos 3 prioridades profissionais.');
    }

    if (dto.contractTypes.length < 1) {
      throw new BadRequestException('Selecione ao menos 1 regime de contratação aceito.');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.candidate.update({
        where: { id: candidateId },
        data: {
          profileCompleted: true,
          avatarIndex: dto.avatarIndex ?? null,
          avatarUrl: dto.avatarUrl ?? null,

          desiredSectorId: dto.desiredSectorId,
          desiredPositionId: dto.desiredPositionId,
          desiredSalaryMin: dto.salaryMin ?? null,
          desiredSalaryMax: dto.salaryMax ?? null,
          salaryNegotiable: dto.salaryNegotiable ?? false,
          contractTypes: dto.contractTypes as any,
          experienceLevel: dto.experienceLevel as any,
          acceptsTravel: dto.acceptsTravel,

          city: dto.city,
          state: dto.state,
        },
      });

      await tx.candidateInterest.deleteMany({ where: { candidateId } });

      if (dto.interestIds.length > 0) {
        await tx.candidateInterest.createMany({
          data: dto.interestIds.map((interestId) => ({ candidateId, interestId })),
          skipDuplicates: true,
        });
      }

      await tx.candidatePriority.deleteMany({ where: { candidateId } });

      if (dto.priorities.length > 0) {
        await tx.candidatePriority.createMany({
          data: dto.priorities.map(({ priorityId, order }) => ({
            candidateId,
            priorityId,
            order,
          })),
          skipDuplicates: true,
        });
      }

      let resume = await tx.candidateResume.findUnique({
        where: { candidateId },
      });

      if (!resume) {
        resume = await tx.candidateResume.create({  
          data: { candidateId, isGuided: true },
        });
      } else {
        await tx.candidateResume.update({
          where: { id: resume.id },
          data: { isGuided: true },
        });
      }

      const resumeId = resume.id;

      await tx.resumeEducation.deleteMany({ where: { resumeId } });

      if (dto.education?.level) {
        await tx.resumeEducation.create({
          data: {
            resumeId,
            level: dto.education.level as any ?? '',
            institution: dto.education.institution ?? '',
            course: '',
            startDate: new Date('2000-01-01'),
            current: true,
          },
        });
      }

      await tx.resumeExperience.deleteMany({ where: { resumeId } });

      if (!dto.firstJobSeeker && dto.experiences.length > 0) {
        await tx.resumeExperience.createMany({
          data: dto.experiences.map((exp) => ({
            resumeId,
            company: exp.company,
            position: exp.position,
            description: exp.description || null,
            startDate: new Date(`${exp.startDate}-01`),
            endDate: exp.endDate ? new Date(`${exp.endDate}-01`) : null,
            current: exp.current,
          })),
        });
      }

      await tx.resumeSkill.deleteMany({ where: { resumeId } });

      if (dto.skills && dto.skills.length > 0) {
        await tx.resumeSkill.createMany({
          data: dto.skills.map((s) => ({
            resumeId,
            name: s.name,
            level: s.level as any,
          })),
        });
      }

      await tx.resumeLanguage.deleteMany({ where: { resumeId } });

      if (dto.languages && dto.languages.length > 0) {
        await tx.resumeLanguage.createMany({
          data: dto.languages.map((l) => ({
            resumeId,
            language: l.language,
            level: l.level as any,
          })),
        });
      }

      await tx.candidateResume.update({
        where: { id: resumeId },
        data: { isComplete: true },
      });
    });

    return { message: 'Perfil concluído com sucesso.' };
  }
}