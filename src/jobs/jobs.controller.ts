import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobsService } from './jobs.service';
import { PlanGuard } from '../guards/plan.guard';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'), PlanGuard)
export class JobsController {
  constructor(private jobsService: JobsService) { }

  @Post()
  create(@Body() body: any, @Request() req) {
    return this.jobsService.create(req.user.companyId, body);
  }

  @Get()
  async findAll(@Request() req, @Query('page') page = '1', @Query('limit') limit = '10') {
    return this.jobsService.findAll(req.user.companyId, +page, +limit);
  }

  @Get('benefits')
  getAllBenefits() {
    return this.jobsService.getAllBenefits();
  }

  @Get('sector')
  findAllArea() {
    return this.jobsService.findAllSector();
  }

  @Get('sector/:id/positions')
  findPositions(@Param('id') id: number) {
    return this.jobsService.findPositionsBySector(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.jobsService.findOne(+id, req.user.companyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.jobsService.update(+id, req.user.companyId, body);
  }

  @Post(':id/status')
  updateStatusJob(@Param('id') id: number, @Body('status') status: 'ACTIVE' | 'INACTIVE', @Request() req) {
    return this.jobsService.updateStatusJob(id, req.user.companyId, status );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.jobsService.remove(+id, req.user.companyId);
  }
}