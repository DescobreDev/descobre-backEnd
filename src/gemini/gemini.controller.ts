import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { AuthGuard } from '@nestjs/passport';
import { PlanGuard } from '../guards/plan.guard';

@Controller('ai')
@UseGuards(AuthGuard('jwt'), PlanGuard)
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) { }

  @Post('vacancySummary')
  async generateSummary(@Request() req, @Body() body: {
    title: string;
    sector: string;
    position: string;
    workFormat?: string;
    city?: string;
    state?: string;
  }) {
    return this.geminiService.generateSummaryVacancy(req.user.companyId, body);
  }

  @Post('salarySuggestion')
  async generateSalarySuggestion(@Request() req, @Body() body: {
    title: string;
    sector: string;
    position: string;
    workFormat?: string;
    city?: string;
    state?: string;
  }) {
    return this.geminiService.generateSalarySuggestion(req.user.companyId, body);
  }

  @Post('jobProfile')
  async generateJobProfile(
    @Body()
    body: {
      title: string;
      sector: string;
      position: string;
      description?: string;
    },
  ) {
    return this.geminiService.generateJobProfile(body);
  }
}