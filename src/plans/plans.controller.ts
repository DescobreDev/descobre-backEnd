import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlansService } from './plans.service';

@UseGuards(AuthGuard('jwt'))
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Post('subscribe')
  subscribePlan(@Body() body: { planId: number }, @Request() req) {
    return this.plansService.subscribePlan(req.user.companyId, body.planId);
  }
}