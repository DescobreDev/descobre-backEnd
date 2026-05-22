import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { CandidateAuthService } from './candidate-auth.service';

@Controller('candidate/auth')
export class CandidateAuthController {
  constructor(private readonly candidateAuthService: CandidateAuthService) {}

  @Post('register')
  register(@Body() body: { cpf: string; password: string }) {
    return this.candidateAuthService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { cpf: string; password: string }) {
    return this.candidateAuthService.login(body);
  }
}