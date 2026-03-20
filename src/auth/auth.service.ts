import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    validatePassword(data.password);

    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new BadRequestException('Usuário já existe.');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });

      return { user };
    });

    const payload = {
      sub: result.user.id,
      email: result.user.email,
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn: '8h' });

    return {
      user: result.user,
      access_token: token,
    };
  }

  async login(data: { email: string; password: string; rememberMe?: boolean }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };

    const expiresIn = data.rememberMe ? '30d' : '8h';

    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return {
      access_token: token,
    };
  }
}