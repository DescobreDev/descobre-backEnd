import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(data: any) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new BadRequestException("Usuário já existe");
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

        const token = await this.jwtService.signAsync(payload);

        return {
            user: result.user,
            access_token: token,
        };
    }

    async login(data: any){
        const user = await this.prisma.user.findUnique({
            where: {email: data.email},
        });

        if(!user){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatch = await bcrypt.compare(
            data.password,
            user.password
        )

        if(!passwordMatch){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            companyId: user.companyId
        }
        
        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token
        }
    }
}