import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CandidateAuthGuard } from 'src/candidate-auth/guards/candidate-auth.guard';
import { CandidateResumeService } from './candidate-resume.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { CreateSkillDto } from './dto/skill.dto';
import { CreateLanguageDto } from './dto/language.dto';
import { UpdateEducationDto } from './dto/education.dto';

@Controller('candidate/resume')
@UseGuards(CandidateAuthGuard)
export class CandidateResumeController {
  constructor(private readonly service: CandidateResumeService) {}

  @Get()
  getResume(@Request() req: any) {
    return this.service.getResume(req.user.id);
  }

  @Put('education')
  upsertEducation(@Request() req: any, @Body() dto: UpdateEducationDto) {
    return this.service.upsertEducation(req.user.id, dto);
  }

  @Post('experiences')
  addExperience(@Request() req: any, @Body() dto: CreateExperienceDto) {
    return this.service.addExperience(req.user.id, dto);
  }

  @Put('experiences/:id')
  updateExperience(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExperienceDto,
  ) {
    return this.service.updateExperience(req.user.id, id, dto);
  }

  @Delete('experiences/:id')
  removeExperience(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.removeExperience(req.user.id, id);
  }

  @Post('skills')
  addSkill(@Request() req: any, @Body() dto: CreateSkillDto) {
    return this.service.addSkill(req.user.id, dto);
  }

  @Delete('skills/:id')
  removeSkill(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.removeSkill(req.user.id, id);
  }

  @Post('languages')
  addLanguage(@Request() req: any, @Body() dto: CreateLanguageDto) {
    return this.service.addLanguage(req.user.id, dto);
  }

  @Delete('languages/:id')
  removeLanguage(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.removeLanguage(req.user.id, id);
  }
}
