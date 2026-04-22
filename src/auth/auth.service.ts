// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
// import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

// ─── Regras de senha ──────────────────────────────────────────────────────────
const PASSWORD_RULES = [
  { regex: /[A-Z]/, message: 'A senha deve conter pelo menos uma letra maiúscula.' },
  { regex: /[a-z]/, message: 'A senha deve conter pelo menos uma letra minúscula.' },
  { regex: /[0-9]/, message: 'A senha deve conter pelo menos um número.' },
  { regex: /[^A-Za-z0-9]/, message: 'A senha deve conter pelo menos um caractere especial.' },
];

function validatePassword(password: string): void {
  if (!password || password.length < 8) {
    throw new BadRequestException('A senha deve ter no mínimo 8 caracteres.');
  }
  for (const rule of PASSWORD_RULES) {
    if (!rule.regex.test(password)) {
      throw new BadRequestException(rule.message);
    }
  }
}

const OTP_EXPIRES_MINUTES = 15;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN = 60;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    // private mailService: MailService,
  ) { }

  async register(data: { name: string; email: string; password: string; code: number }) {
    validatePassword(data.password);

    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (existing.isVerified) {
        throw new BadRequestException('Este email já está cadastrado.');
      }
      // return this._resendCodeToExisting(existing);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    // const { code, hashedCode, expiresAt } = generateOtp();

    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        isVerified: false,
        // verificationCode: hashedCode,
        // verificationCodeExpires: expiresAt,
        lastCodeSentAt: new Date(),
      },
    });

    // await this.mailService.sendVerificationCode(
    //   { email: data.email, name: data.name, code: data.code },
    //   code,
    // );

    return { message: 'Código de verificação enviado para o seu email.' };
  }

  // async verifyEmail(data: { email: string; code: string }) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email: data.email },
  //   });

  //   if (!user || user.isVerified) {
  //     throw new BadRequestException('Solicitação inválida.');
  //   }

  //   if (user.verificationAttempts >= OTP_MAX_ATTEMPTS) {
  //     throw new ForbiddenException(
  //       'Muitas tentativas incorretas. Solicite um novo código.',
  //     );
  //   }

  //   if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
  //     throw new BadRequestException('Código expirado. Solicite um novo código.');
  //   }

  //   const codeMatch = await bcrypt.compare(data.code, user.verificationCode!);

  //   if (!codeMatch) {
  //     await this.prisma.user.update({
  //       where: { id: user.id },
  //       data: { verificationAttempts: { increment: 1 } },
  //     });
  //     const remaining = OTP_MAX_ATTEMPTS - (user.verificationAttempts + 1);
  //     throw new BadRequestException(
  //       `Código incorreto. ${remaining > 0 ? `${remaining} tentativa(s) restante(s).` : 'Solicite um novo código.'}`,
  //     );
  //   }

  //   await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       isVerified: true,
  //       verificationCode: null,
  //       verificationCodeExpires: null,
  //       verificationAttempts: 0,
  //       lastCodeSentAt: null,
  //     },
  //   });

  //   this.mailService.sendWelcomeEmail({ email: user.email, name: user.name });

  //   const token = await this._signToken(user.id, user.email, user.companyId);
  //   return {
  //     message: 'Email verificado com sucesso!',
  //     access_token: token,
  //   };
  // }

  // async resendCode(data: { email: string }) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email: data.email },
  //   });

  //   if (!user) throw new NotFoundException('Usuário não encontrado.');
  //   if (user.isVerified) throw new BadRequestException('Este email já foi verificado.');

  //   if (user.lastCodeSentAt) {
  //     const secondsSinceLast = (Date.now() - user.lastCodeSentAt.getTime()) / 1000;
  //     if (secondsSinceLast < OTP_RESEND_COOLDOWN) {
  //       const waitSeconds = Math.ceil(OTP_RESEND_COOLDOWN - secondsSinceLast);
  //       throw new BadRequestException(
  //         `Aguarde ${waitSeconds}s antes de solicitar um novo código.`,
  //       );
  //     }
  //   }

  //   const { code, hashedCode, expiresAt } = generateOtp();

  //   await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       verificationCode: hashedCode,
  //       verificationCodeExpires: expiresAt,
  //       verificationAttempts: 0,
  //       lastCodeSentAt: new Date(),
  //     },
  //   });

  //   await this.mailService.sendVerificationCode(
  //     { email: user.email, name: user.name },
  //     code,
  //   );

  //   return { message: 'Novo código enviado para o seu email.' };
  // }

  // async login(data: { email: string; password: string; rememberMe?: boolean }) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email: data.email },
  //   });

  //   if (!user) throw new UnauthorizedException('Credenciais inválidas.');

  //   const passwordMatch = await bcrypt.compare(data.password, user.password);
  //   if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas.');

  //   if (!user.isVerified) {
  //     throw new ForbiddenException(
  //       'Conta não verificada. Verifique seu email antes de entrar.',
  //     );
  //   }

  //   const expiresIn = data.rememberMe ? '30d' : '8h';
  //   const token = await this._signToken(user.id, user.email, user.companyId, expiresIn);

  //   return { access_token: token };
  // }

  //   async getMe(userId: number) {
  //     const user = await this.prisma.user.findUnique({
  //       where: { id: userId },
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         role: true,
  //         companyId: true,
  //         createdAt: true,
  //         isVerified: true,
  //         company: {
  //           select: {
  //             id: true,
  //             name: true,
  //             onboardingCompleted: true,
  //             subscription: {
  //               select: {
  //                 active: true,
  //                 isAnnual: true,
  //                 plan: {
  //                   select: {
  //                     name: true,
  //                     maxJobs: true,
  //                     maxAiResume: true,
  //                     maxAiSalary: true,
  //                     maxInterviews: true,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });

  //     if (!user) throw new NotFoundException('Usuário não encontrado.');
  //     return user;
  //   }

  //   private async _resendCodeToExisting(user: { id: number; email: string; name: string; lastCodeSentAt: Date | null }) {
  //     if (user.lastCodeSentAt) {
  //       const secondsSinceLast = (Date.now() - user.lastCodeSentAt.getTime()) / 1000;
  //       if (secondsSinceLast < OTP_RESEND_COOLDOWN) {
  //         const wait = Math.ceil(OTP_RESEND_COOLDOWN - secondsSinceLast);
  //         throw new BadRequestException(
  //           `Email já cadastrado. Aguarde ${wait}s para reenviar o código de verificação.`,
  //         );
  //       }
  //     }

  //     const { code, hashedCode, expiresAt } = generateOtp();
  //     await this.prisma.user.update({
  //       where: { id: user.id },
  //       data: {
  //         verificationCode: hashedCode,
  //         verificationCodeExpires: expiresAt,
  //         verificationAttempts: 0,
  //         lastCodeSentAt: new Date(),
  //       },
  //     });

  //     await this.mailService.sendVerificationCode(
  //       { email: user.email, name: user.name },
  //       code,
  //     );

  //     return { message: 'Código de verificação reenviado para o seu email.' };
  //   }

  //   private async _signToken(
  //     userId: number,
  //     email: string,
  //     companyId?: number | null,
  //     expiresIn = '8h',
  //   ): Promise<string> {
  //     return this.jwtService.signAsync(
  //       { sub: userId, email, companyId },
  //       { expiresIn },
  //     );
  //   }
  // }

  // function generateOtp(): { code: string; hashedCode: string; expiresAt: Date } {
  //   const code = Math.floor(100_000 + Math.random() * 900_000).toString();

  //   const hashedCode = bcrypt.hashSync(code, 10);
  //   const expiresAt = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);
  //   return { code, hashedCode, expiresAt };
}