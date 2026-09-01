import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CandidateAuthService } from './candidate-auth.service';

@Controller('candidate/auth')
export class CandidateAuthController {
  constructor(private readonly candidateAuthService: CandidateAuthService) {}

  @Post('register')
  register(
    @Body()
    body: {
      cpf: string;
      password: string;
      name: string;
      birthDate?: string | null;
    },
  ) {
    return this.candidateAuthService.register(body);
  }

  @Post('check-cpf')
  @HttpCode(HttpStatus.OK)
  async checkCpf(@Body() body: { cpf: string }) {
    return this.candidateAuthService.checkCpf(body.cpf);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { cpf: string; password: string }) {
    return this.candidateAuthService.login(body);
  }
}
