// src/auth/guards/candidate-optional-auth.guard.ts
//
// Guard que tenta autenticar pelo token JWT do candidato,
// mas NÃO rejeita a request se não houver token.
//
// Resultado:
//   - Com token válido  → req.user = { id, email }
//   - Sem token / token inválido → req.user = undefined (request continua)
//
// Use em rotas públicas que se comportam diferente quando o candidato está logado.
// Ex: GET /candidate/jobs — sem login funciona, com login marca alreadyApplied.

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CandidateOptionalAuthGuard extends AuthGuard('candidate-jwt') {
  // Sobrescreve o comportamento padrão: em vez de lançar 401,
  // simplesmente deixa a request passar com req.user = undefined
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // Quando o token é inválido ou ausente, o AuthGuard chama handleRequest
  // com err/user nulos. Aqui simplesmente retornamos null em vez de lançar.
  handleRequest(_err: any, user: any) {
    return user ?? null;
  }
}