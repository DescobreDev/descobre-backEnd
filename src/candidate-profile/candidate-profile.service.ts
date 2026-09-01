import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { UpdateInterestsDto } from './dto/update-interests.dto';
import { UpdatePrioritiesDto } from './dto/update-priorities.dto';

@Injectable()
export class CandidateProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(candidateId: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        interests: { include: { interest: true } },
        priorities: { include: { priority: true }, orderBy: { order: 'asc' } },
        desiredSector: true,
        desiredPosition: true,
      },
    });

    if (!candidate) throw new NotFoundException('Candidato não encontrado.');

    return {
      ...candidate,
      completionPercentage: this.calculateCompletion(candidate),
    };
  }

  async updateProfile(candidateId: number, dto: UpdateProfileDto) {
    return this.prisma.candidate.update({
      where: { id: candidateId },
      data: dto,
    });
  }

  async updatePreferences(candidateId: number, dto: UpdatePreferencesDto) {
    return this.prisma.candidate.update({
      where: { id: candidateId },
      data: {
        desiredSectorId: dto.desiredSectorId,
        desiredPositionId: dto.desiredPositionId,
        desiredSalaryMin: dto.salaryMin,
        desiredSalaryMax: dto.salaryMax,
        salaryNegotiable: dto.salaryNegotiable,
        contractTypes: dto.contractTypes,
        experienceLevel: dto.experienceLevel,
      },
    });
  }

  async updateInterests(candidateId: number, dto: UpdateInterestsDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.candidateInterest.deleteMany({ where: { candidateId } });
      await tx.candidateInterest.createMany({
        data: dto.interestIds.map((interestId) => ({
          candidateId,
          interestId,
        })),
        skipDuplicates: true,
      });
      return tx.candidateInterest.findMany({
        where: { candidateId },
        include: { interest: true },
      });
    });
  }

  async updatePriorities(candidateId: number, dto: UpdatePrioritiesDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.candidatePriority.deleteMany({ where: { candidateId } });
      await tx.candidatePriority.createMany({
        data: dto.priorities.map((p) => ({
          candidateId,
          priorityId: p.priorityId,
          order: p.order,
        })),
        skipDuplicates: true,
      });
      return tx.candidatePriority.findMany({
        where: { candidateId },
        include: { priority: true },
        orderBy: { order: 'asc' },
      });
    });
  }

  private calculateCompletion(candidate: any): number {
    const checks = [
      !!candidate.city,
      !!candidate.desiredSectorId,
      !!candidate.phone,
      candidate.interests?.length > 0,
      candidate.priorities?.length >= 3,
    ];
    const done = checks.filter(Boolean).length;
    return Math.round((done / checks.length) * 100);
  }
}
