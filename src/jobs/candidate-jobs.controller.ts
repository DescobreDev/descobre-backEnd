import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CandidateAuthGuard } from '../candidate-auth/guards/candidate-auth.guard';
import { CandidateOptionalAuthGuard } from '../candidate-auth/guards/candidate-optional-auth.guard';
import { ApplyJobDto } from './dto/apply-job';
interface MaybeAuthRequest extends Request {
  user?: { id: number; email: string };
}

interface AuthRequest extends Request {
  user: { id: number; email: string };
}

@Controller('candidate/jobs')
export class CandidateJobsController {
  constructor(private readonly jobsService: JobsService) {}
  @Get()
  @UseGuards(CandidateOptionalAuthGuard)
  findAll(
    @Request() req: MaybeAuthRequest,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('workFormat') workFormat?: 'REMOTE' | 'HYBRID' | 'ONSITE',
    @Query('contractType') contractType?: 'CLT' | 'PJ' | 'FREELANCER',
    @Query('sectorId') sectorId?: string,
  ) {
    return this.jobsService.findForCandidates({
      page: +page,
      limit: +limit,
      search,
      workFormat,
      contractType,
      sectorId: sectorId ? +sectorId : undefined,
      candidateId: req.user?.id,
    });
  }

  @Get(':id')
  @UseGuards(CandidateOptionalAuthGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: MaybeAuthRequest,
  ) {
    return this.jobsService.findOneForCandidate(id, req.user?.id);
  }

  @Post(':id/apply')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(CandidateAuthGuard)
  apply(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthRequest,
    @Body() _dto: ApplyJobDto,
  ) {
    return this.jobsService.applyToJob(jobId, req.user.id);
  }
}