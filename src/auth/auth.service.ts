import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

const PASSWORD_RULES = [
  { regex: /[A-Z]/, message: 'A senha deve conter pelo menos uma letra maiúscula.' },
  { regex: /[a-z]/, message: 'A senha deve conter pelo menos uma letra minúscula.' },
  { regex: /[0-9]/, message: 'A senha deve conter pelo menos um número.' },
  { regex: /[^A-Za-z0-9]/, message: 'A senha deve conter pelo menos um caractere especial.' },
];

const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60_000;

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

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }

  // ─── Register ────────────────────────────────────────────────────────────────

  async register(data: { name: string; email: string; password: string }) {
    validatePassword(data.password);

    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new BadRequestException('Usuário já existe.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const code = generateCode();
    const hashedCode = await bcrypt.hash(code, 10);

    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        verificationCode: hashedCode,
        verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 min
        verificationAttempts: 0,
        lastCodeSentAt: new Date(),
        isVerified: false,
      },
    });

    await this.mailService.sendVerificationCode(data.email, code, data.name);

    return { message: 'Conta criada. Verifique seu email para ativar.' };
  }

  // ─── Verify Email ─────────────────────────────────────────────────────────────

  async verifyEmail(data: { email: string; code: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email já verificado.');
    }

    // Brute-force
    if (user.verificationAttempts >= MAX_ATTEMPTS) {
      throw new BadRequestException(
        'Muitas tentativas. Solicite um novo código.',
      );
    }

    // Código expirado
    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < new Date()
    ) {
      throw new BadRequestException('Código expirado. Solicite um novo.');
    }

    // Compara com o hash salvo
    const codeMatch =
      user.verificationCode &&
      (await bcrypt.compare(data.code, user.verificationCode));

    if (!codeMatch) {
      await this.prisma.user.update({
        where: { email: data.email },
        data: { verificationAttempts: { increment: 1 } },
      });

      const remaining = MAX_ATTEMPTS - (user.verificationAttempts + 1);
      throw new BadRequestException(
        remaining > 0
          ? `Código inválido. ${remaining} tentativa(s) restante(s).`
          : 'Muitas tentativas. Solicite um novo código.',
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { email: data.email },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodeExpires: null,
        verificationAttempts: 0,
        lastCodeSentAt: null,
      },
    });

    const payload = { sub: updatedUser.id, email: updatedUser.email };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '8h' });

    return { access_token: token };
  }

  async resendCode(data: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email já verificado.');
    }

    // Throttle
    if (user.lastCodeSentAt) {
      const diff = Date.now() - user.lastCodeSentAt.getTime();
      if (diff < RESEND_COOLDOWN_MS) {
        const wait = Math.ceil((RESEND_COOLDOWN_MS - diff) / 1000);
        throw new BadRequestException(
          `Aguarde ${wait}s antes de solicitar um novo código.`,
        );
      }
    }

    const code = generateCode();
    const hashedCode = await bcrypt.hash(code, 10);

    await this.prisma.user.update({
      where: { email: data.email },
      data: {
        verificationCode: hashedCode,
        verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
        verificationAttempts: 0,
        lastCodeSentAt: new Date(),
      },
    });

    await this.mailService.sendVerificationCode(user.email, code, user.name);

    return { message: 'Novo código enviado.' };
  }

  async login(data: { email: string; password: string; rememberMe?: boolean }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas.');

    if (!user.isVerified) {
      // Reenvia o código se já passou o cooldown
      const canResend =
        !user.lastCodeSentAt ||
        Date.now() - user.lastCodeSentAt.getTime() >= RESEND_COOLDOWN_MS;

      if (canResend) {
        const code = generateCode();
        const hashedCode = await bcrypt.hash(code, 10);

        await this.prisma.user.update({
          where: { email: data.email },
          data: {
            verificationCode: hashedCode,
            verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
            verificationAttempts: 0,
            lastCodeSentAt: new Date(),
          },
        });

        await this.mailService.sendVerificationCode(user.email, code, user.name);
      }

      throw new HttpException(
        {
          statusCode: 403,
          error: 'email_not_verified',
          message: 'Confirme seu email antes de entrar. Um novo código foi enviado.',
          email: user.email,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };

    const expiresIn = data.rememberMe ? '30d' : '8h';
    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return { access_token: token };
  }

  // ─── Forgot Password ──────────────────────────────────────────────────────────

  async forgotPassword(data: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Este e-mail não está cadastrado.');
    }

    if (user.lastResetCodeSentAt) {
      const diff = Date.now() - user.lastResetCodeSentAt.getTime();
      if (diff < RESEND_COOLDOWN_MS) {
        const wait = Math.ceil((RESEND_COOLDOWN_MS - diff) / 1000);
        throw new BadRequestException(
          `Aguarde ${wait}s antes de solicitar um novo código.`,
        );
      }
    }

    const code = generateCode();
    const hashedCode = await bcrypt.hash(code, 10);

    await this.prisma.user.update({
      where: { email: data.email },
      data: {
        resetPasswordCode: hashedCode,
        resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
        resetPasswordAttempts: 0,
        lastResetCodeSentAt: new Date(),
      },
    });

    await this.mailService.sendPasswordResetCode(user.email, code, user.name);

    return { message: 'Código enviado com sucesso.' };
  }

  // ─── Reset Password ───────────────────────────────────────────────────────────

  async resetPassword(data: { email: string; code: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Código inválido ou expirado.');
    }

    if (user.resetPasswordAttempts >= MAX_ATTEMPTS) {
      throw new BadRequestException('Muitas tentativas. Solicite um novo código.');
    }

    if (
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('Código expirado. Solicite um novo.');
    }

    const codeMatch =
      user.resetPasswordCode &&
      (await bcrypt.compare(data.code, user.resetPasswordCode));

    if (!codeMatch) {
      await this.prisma.user.update({
        where: { email: data.email },
        data: { resetPasswordAttempts: { increment: 1 } },
      });

      const remaining = MAX_ATTEMPTS - (user.resetPasswordAttempts + 1);
      throw new BadRequestException(
        remaining > 0
          ? `Código inválido. ${remaining} tentativa(s) restante(s).`
          : 'Muitas tentativas. Solicite um novo código.',
      );
    }

    validatePassword(data.newPassword);

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await this.prisma.user.update({
      where: { email: data.email },
      data: {
        password: hashedPassword,
        resetPasswordCode: null,
        resetPasswordExpires: null,
        resetPasswordAttempts: 0,
        lastResetCodeSentAt: null,
      },
    });

    return { message: 'Senha redefinida com sucesso.' };
  }
}