import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { AuthGuard } from '@nestjs/passport';
import { PlanGuard } from '../guards/plan.guard';

@Controller('ai')
@UseGuards(AuthGuard('jwt'), PlanGuard)
export class GeminiController {
  constructor(private readonly geminiController: GeminiService) {}

  @Post('vacancySummary')
  async generateSummary(@Body() body: any) {
    return this.geminiController.generateSummaryVacancy(body.sector, body.Position, body.title);
  }
}