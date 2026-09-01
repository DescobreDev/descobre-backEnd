import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CandidateAuthGuard } from 'src/candidate-auth/guards/candidate-auth.guard';
import { CompleteOnboardingDto } from './dto/complete-onboarding';

@Controller('onboarding')
@UseGuards(CandidateAuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('interests')
  getInterests() {
    return this.onboardingService.getInterests();
  }

  @Get('priorities')
  getPriorities() {
    return this.onboardingService.getPriorities();
  }

  @Get('sectors')
  getSectors(@Query('search') search?: string) {
    return this.onboardingService.getSectors(search);
  }

  @Get('positions')
  getPositions(
    @Query('sectorId', ParseIntPipe) sectorId: number,
    @Query('search') search?: string,
  ) {
    return this.onboardingService.getPositions(sectorId, search);
  }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  complete(@Request() req: any, @Body() dto: CompleteOnboardingDto) {
    return this.onboardingService.complete(req.user.id, dto);
  }
}
