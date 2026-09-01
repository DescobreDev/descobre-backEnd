import { Module } from '@nestjs/common';
import { CandidateProfileController } from './candidate-profile.controller';
import { CandidateProfileService } from './candidate-profile.service';
import { CandidateResumeController } from './candidate-resume.controller';
import { CandidateResumeService } from './candidate-resume.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CandidateProfileController, CandidateResumeController],
  providers: [CandidateProfileService, CandidateResumeService],
  exports: [CandidateResumeService],
})
export class CandidateProfileModule {}
