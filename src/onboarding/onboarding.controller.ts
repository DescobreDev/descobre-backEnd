import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OnboardingService } from './onboarding.service';

interface AuthenticatedRequest extends Request {
  candidate: { id: number; email: string };
}

@Controller('onboarding')
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

//   @Post('complete')
//   @HttpCode(HttpStatus.OK)
//   complete(
//     @Request() req: AuthenticatedRequest,
//   ) {
//     return this.onboardingService.complete(req.candidate.id);
//   }
}