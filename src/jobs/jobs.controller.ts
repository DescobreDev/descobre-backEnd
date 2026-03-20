import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JobsService } from './jobs.service';

@Controller('jobs')
@UseGuards(AuthGuard('jwt'))
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post()
  create(@Body() body: any, @Request() req) {
    return this.jobsService.create(req.user.companyId, body);
  }

  @Get()
  findAll(@Request() req) {
    return this.jobsService.findAll(req.user.companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.jobsService.findOne(+id, req.user.companyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.jobsService.update(+id, req.user.companyId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.jobsService.remove(+id, req.user.companyId);
  }
}