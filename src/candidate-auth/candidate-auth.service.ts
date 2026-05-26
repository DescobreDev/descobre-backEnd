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
  ) {}

  async register(data: { cpf: string; password: string }) {
    const { cpf, password } = data;

    const cleanCpf = cpf.replace(/\D/g, '');

    if (!this.isValidCpf(cleanCpf)) {
      throw new BadRequestException('CPF inválido.');
    }

    const existing = await this.prisma.candidate.findUnique({
      where: { cpf: cleanCpf },
    });
    if (existing) throw new ConflictException('CPF já cadastrado.');

    let cpfData: { name: string; email?: string; phone?: string; birthDate?: string };
    try {
      cpfData = await this.cpfApiService.lookup(cleanCpf);
    } catch {
      throw new InternalServerErrorException(
        'Não foi possível validar o CPF. Tente novamente.',
      );
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const candidate = await this.prisma.candidate.create({
    //   data: {
    //     cpf: cleanCpf,
    //     name: cpfData.name,
    //     email: cpfData.email ?? `${cleanCpf}@sem-email.com`,
    //     phone: cpfData.phone ?? null,
    //     birthDate: cpfData.birthDate ? new Date(cpfData.birthDate) : null,
    //     password: hashedPassword,
    //     isVerified: true,
    //   },
    // });

    // return {
    //   message: 'Cadastro realizado com sucesso.',
    //   candidate: {
    //     id: candidate.id,
    //     name: candidate.name,
    //     cpf: cleanCpf,
    //   },
    // };
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