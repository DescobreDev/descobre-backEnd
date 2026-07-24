import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CpfApiService } from '../cpf-api/cpf-api.service';

@Injectable()
export class CandidateAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cpfApiService: CpfApiService,
  ) { }

  async checkCpf(cpf: string) {
    const cleanCpf = cpf.replace(/\D/g, '');

    if (!this.isValidCpf(cleanCpf)) {
      throw new BadRequestException('CPF inválido.');
    }

    const existing = await this.prisma.candidate.findUnique({
      where: { cpf: cleanCpf },
    });
    if (existing) throw new ConflictException('CPF já cadastrado.');

    let cpfData: { name: string; birthDate?: string };
    try {
      cpfData = await this.cpfApiService.lookup(cleanCpf);
    } catch {
      throw new InternalServerErrorException(
        'Não foi possível validar o CPF. Tente novamente.',
      );
    }

    if (!cpfData.name) {
      throw new BadRequestException('CPF não encontrado na base de dados.');
    }

    return {
      name: cpfData.name,
      birthDate: cpfData.birthDate ?? null,
    };
  }

  async register(data: {
    cpf: string;
    password: string;
    name: string;
    birthDate?: string | null;
  }) {
    const { cpf, password, name, birthDate } = data;
    const cleanCpf = cpf.replace(/\D/g, '');

    if (!this.isValidCpf(cleanCpf)) {
      throw new BadRequestException('CPF inválido.');
    }
    if (!name) {
      throw new BadRequestException('Nome não informado.');
    }

    const existing = await this.prisma.candidate.findUnique({
      where: { cpf: cleanCpf },
    });
    if (existing) throw new ConflictException('CPF já cadastrado.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const candidate = await this.prisma.candidate.create({
      data: {
        cpf: cleanCpf,
        name,
        email: `${cleanCpf}@sem-email.com`,
        birthDate: birthDate ? this.parseBrDate(birthDate) : null,
        password: hashedPassword,
        isVerified: true,
      },
    });

    return {
      message: 'Cadastro realizado com sucesso.',
      candidate: {
        id: candidate.id,
        name: candidate.name,
        cpf: cleanCpf,
      },
    };
  }

  private parseBrDate(dateStr: string): Date | null {
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  }

  async login(data: { cpf: string; password: string }) {
    const { cpf, password } = data;

    const cleanCpf = cpf.replace(/\D/g, '');

    const candidate = await this.prisma.candidate.findUnique({
      where: { cpf: cleanCpf },
    });
    if (!candidate) throw new UnauthorizedException('CPF não encontrado! Crie uma conta');

    const passwordMatch = await bcrypt.compare(password, candidate.password);
    if (!passwordMatch) throw new UnauthorizedException('CPF ou senha inválidos.');

    const token = this.jwtService.sign({
      sub: candidate.id,
      cpf: candidate.cpf,
      role: 'CANDIDATE',
    });

    return {
      token,
      candidate: {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        profileCompleted: candidate.profileCompleted,
      },
    };
  }


  private isValidCpf(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calc = (factor: number) => {
      let sum = 0;
      for (let i = 0; i < factor - 1; i++) {
        sum += parseInt(cpf[i]) * (factor - i);
      }
      const rest = (sum * 10) % 11;
      return rest === 10 || rest === 11 ? 0 : rest;
    };

    return calc(10) === parseInt(cpf[9]) && calc(11) === parseInt(cpf[10]);
  }
}