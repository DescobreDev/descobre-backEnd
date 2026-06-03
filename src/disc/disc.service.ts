import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DISC_QUESTIONS, DiscProfile } from './disc.questions';
import { SubmitDiscDto } from './dto/submit-disc.dto';

@Injectable()
export class DiscService {
  constructor(private readonly prisma: PrismaService) {}

  getQuestions() {
    const shuffled = [...DISC_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map(({ id, text, options }) => ({ id, text, options }));
  }

  async submit(candidateId: number, dto: SubmitDiscDto) {
    const primary = dto.answer1 as DiscProfile;
    let secondary = dto.answer2 as DiscProfile;

    if (primary === secondary) {
      if (!dto.answer3) {
        throw new BadRequestException('Desempate necessário.');
      }
      if (dto.answer3 === primary) {
        throw new BadRequestException('Perfil secundário não pode ser igual ao principal.');
      }
      secondary = dto.answer3 as DiscProfile;
    }

    await this.prisma.candidate.update({
      where: { id: candidateId },
      data: {
        profileType: primary,
        profileTypeSecondary: secondary,
      },
    });

    return { profileType: primary, profileTypeSecondary: secondary };
  }
}