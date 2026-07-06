import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { JobsService } from '../jobs/jobs.service';
import { CandidateAuthGuard } from '../candidate-auth/guards/candidate-auth.guard';

interface AuthRequest extends Request {
  user: { id: number; email: string };
}

@Controller('candidate/applications')
export class CandidateApplicationsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @UseGuards(CandidateAuthGuard)
  findMyApplications(
    @Request() req: AuthRequest,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('status') status?: ApplicationStatus,
  ) {
    return this.jobsService.findApplicationsForCandidate(req.user.id, {
      page: +page,
      limit: +limit,
      status,
    });
  }
}