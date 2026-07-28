// // candidate-resume.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
// import { CreateSkillDto } from './dto/skill.dto';
// import { CreateLanguageDto } from './dto/language.dto';
// import { UpdateEducationDto } from './dto/education.dto';

// @Injectable()
// export class CandidateResumeService {
//   constructor(private readonly prisma: PrismaService) {}

//   async getResume(candidateId: number) {
//     const resume = await this.getOrCreateResume(candidateId);
//     return this.prisma.candidateResume.findUnique({
//       where: { id: resume.id },
//       include: { education: true, experiences: true, skills: true, languages: true },
//     });
//   }

//   async upsertEducation(candidateId: number, dto: UpdateEducationDto) {
//     const resume = await this.getOrCreateResume(candidateId);

//     await this.prisma.resumeEducation.deleteMany({ where: { resumeId: resume.id } });

//     return this.prisma.resumeEducation.create({
//       data: {
//         resumeId: resume.id,
//         level: dto.level as any,
//         institution: dto.institution ?? '',
//         course: dto.course ?? '',
//         startDate: dto.startDate ? new Date(`${dto.startDate}-01`) : new Date('2000-01-01'),
//         current: dto.current ?? true,
//       },
//     });
//   }

//   async addExperience(candidateId: number, dto: CreateExperienceDto) {
//     const resume = await this.getOrCreateResume(candidateId);
//     return this.prisma.resumeExperience.create({
//       data: {
//         resumeId: resume.id,
//         company: dto.company,
//         position: dto.position,
//         description: dto.description ?? null,
//         startDate: new Date(`${dto.startDate}-01`),
//         endDate: dto.endDate ? new Date(`${dto.endDate}-01`) : null,
//         current: dto.current,
//       },
//     });
//   }

//   async updateExperience(candidateId: number, id: number, dto: UpdateExperienceDto) {
//     await this.assertOwnership('resumeExperience', candidateId, id);
//     return this.prisma.resumeExperience.update({
//       where: { id },
//       data: {
//         ...dto,
//         startDate: dto.startDate ? new Date(`${dto.startDate}-01`) : undefined,
//         endDate: dto.current ? null : dto.endDate ? new Date(`${dto.endDate}-01`) : undefined,
//       },
//     });
//   }

//   async removeExperience(candidateId: number, id: number) {
//     await this.assertOwnership('resumeExperience', candidateId, id);
//     return this.prisma.resumeExperience.delete({ where: { id } });
//   }

//   async addSkill(candidateId: number, dto: CreateSkillDto) {
//     const resume = await this.getOrCreateResume(candidateId);
//     return this.prisma.resumeSkill.create({
//       data: { resumeId: resume.id, name: dto.name, level: dto.level as any },
//     });
//   }

//   async removeSkill(candidateId: number, id: number) {
//     await this.assertOwnership('resumeSkill', candidateId, id);
//     return this.prisma.resumeSkill.delete({ where: { id } });
//   }

//   async addLanguage(candidateId: number, dto: CreateLanguageDto) {
//     const resume = await this.getOrCreateResume(candidateId);
//     return this.prisma.resumeLanguage.create({
//       data: { resumeId: resume.id, language: dto.language, level: dto.level as any },
//     });
//   }

//   async removeLanguage(candidateId: number, id: number) {
//     await this.assertOwnership('resumeLanguage', candidateId, id);
//     return this.prisma.resumeLanguage.delete({ where: { id } });
//   }

//   private async getOrCreateResume(candidateId: number) {
//     const existing = await this.prisma.candidateResume.findUnique({ where: { candidateId } });
//     if (existing) return existing;
//     return this.prisma.candidateResume.create({ data: { candidateId } });
//   }

//   private async assertOwnership(
//     model: 'resumeExperience' | 'resumeSkill' | 'resumeLanguage',
//     candidateId: number,
//     id: number,
//   ) {
//     const record = await (this.prisma[model] as any).findUnique({
//       where: { id },
//       include: { resume: true },
//     });
//     if (!record || record.resume.candidateId !== candidateId) {
//       throw new NotFoundException('Registro não encontrado.');
//     }
//   }
// }