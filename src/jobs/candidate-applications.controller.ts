import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { JobsService } from '../jobs/jobs.service';
import { CandidateAuthGuard } from '../candidate-auth/guards/candidate-auth.guard';
import { InterviewResponseDto } from './dto/interview-response.dto';

interface AuthRequest extends Request {
  user: { id: number; email: string };
}

@Controller('candidate/applications')
@UseGuards(CandidateAuthGuard)
export class CandidateApplicationsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.jobsService.findApplicationDetailForCandidate(id, req.user.id);
  }

  @Patch(':id/interview-response')
  respondToInterview(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthRequest,
    @Body() dto: InterviewResponseDto,
  ) {
    return this.jobsService.respondToInterviewByCandidate(
      id,
      req.user.id,
      dto.status,
      dto.note,
      dto.proposedAt ? new Date(dto.proposedAt) : undefined,
    );
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number, @Request() req: AuthRequest) {
    return this.jobsService.cancelApplication(id, req.user.id);
  }
}
