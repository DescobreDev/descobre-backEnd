import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CandidateAuthGuard } from 'src/candidate-auth/guards/candidate-auth.guard';
import { CandidateProfileService } from './candidate-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { UpdateInterestsDto } from './dto/update-interests.dto';
import { UpdatePrioritiesDto } from './dto/update-priorities.dto';

@Controller('candidate/profile')
@UseGuards(CandidateAuthGuard)
export class CandidateProfileController {
  constructor(private readonly service: CandidateProfileService) {}

  @Get()
  getProfile(@Request() req: any) {
    return this.service.getProfile(req.user.id);
  }

  @Patch()
  updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.service.updateProfile(req.user.id, dto);
  }

  @Patch('preferences')
  updatePreferences(@Request() req: any, @Body() dto: UpdatePreferencesDto) {
    return this.service.updatePreferences(req.user.id, dto);
  }

  @Patch('interests')
  updateInterests(@Request() req: any, @Body() dto: UpdateInterestsDto) {
    return this.service.updateInterests(req.user.id, dto);
  }

  @Patch('priorities')
  updatePriorities(@Request() req: any, @Body() dto: UpdatePrioritiesDto) {
    return this.service.updatePriorities(req.user.id, dto);
  }
}
