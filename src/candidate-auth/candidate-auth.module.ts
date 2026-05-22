import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CandidateAuthService } from './candidate-auth.service';
import { CandidateAuthController } from './candidate-auth.controller';
import { CpfApiService } from '../cpf-api/cpf-api.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [CandidateAuthController],
  providers: [
    CandidateAuthService,
    CpfApiService,
  ],
})
export class CandidateAuthModule {}