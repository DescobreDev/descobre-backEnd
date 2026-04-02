import { Controller, UseGuards, Request, Post, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { UsageService } from '../usage/usage.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly usageService: UsageService,
  ) {}

  @Post('create')
  async createCompany(@Body() body: CreateCompanyDto) {
    return this.companyService.createCompany(body);
  }

  @Post('update')
  async updateCompany(@Body() body: CreateCompanyDto, @Request() req) {
    return this.companyService.updateCompany(body, req.user.userId);
  }

  @Get('usage')
  async getUsage(@Request() req) {
    const user = await this.companyService.getUserWithCompany(req.user.userId);
    return this.usageService.getUsage(user.companyId);
  }
}