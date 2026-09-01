import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { CandidateJobsController } from './candidate-jobs.controller';
import { CandidateApplicationsController } from './candidate-applications.controller';
import { JobsService } from './jobs.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsageModule } from '../usage/usage.module';
import { PlanGuard } from '../guards/plan.guard';
import { GeminiModule } from '../gemini/gemini.module';

@Module({
  imports: [PrismaModule, AuthModule, UsageModule, GeminiModule],
  controllers: [
    JobsController,
    CandidateJobsController,
    CandidateApplicationsController,
  ],
  providers: [JobsService, PlanGuard],
})
export class JobsModule {}
