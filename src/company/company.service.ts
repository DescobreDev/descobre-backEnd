import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtService } from '@nestjs/jwt';

function isOnboardingComplete(company: {
    name: string; cnpj: string; employees: number; email: string;
    phone: string; cep: string; address: string; number: string;
    city: string; state: string; about?: string;
}): boolean {
    return !!(
        company.name && company.cnpj && company.employees &&
        company.email && company.phone && company.cep &&
        company.address && company.number && company.city &&
        company.state && company.about
    );
}

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async createCompany(data: CreateCompanyDto) {
        const existing = await this.prisma.company.findUnique({
            where: { cnpj: data.cnpj }
        });

        if (existing) {
            throw new ConflictException('CNPJ já cadastrado');
        }

        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const company = await tx.company.create({
                    data: {
                        name: data.name,
                        cnpj: data.cnpj,
                        employees: data.employees,
                        email: data.email,
                        phone: data.phone,
                        site: data.site ?? null,
                        cep: data.cep,
                        address: data.address,
                        number: data.number,
                        complement: data.complement ?? null,
                        city: data.city,
                        state: data.state,
                        about: data.about ?? null,
                        onboardingCompleted: isOnboardingComplete(data),
                    },
                });

                await tx.user.update({
                    where: { id: data.userId },
                    data: { companyId: company.id },
                });

                return company;
            });

            const updatedUser = await this.prisma.user.findUnique({
                where: { id: data.userId },
            });

            const token = await this.jwtService.signAsync({
                sub: updatedUser.id,
                email: updatedUser.email,
                companyId: updatedUser.companyId,
            });

            return { token };
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar empresa');
        }
    }

    async updateCompany(data: CreateCompanyDto, userId: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user?.companyId) {
                throw new InternalServerErrorException('Usuário não possui empresa');
            }

            const existing = await this.prisma.company.findFirst({
                where: {
                    cnpj: data.cnpj,
                    NOT: { id: user.companyId },
                },
            });

            if (existing) {
                throw new ConflictException('CNPJ já cadastrado');
            }

            const company = await this.prisma.company.update({
                where: { id: user.companyId },
                data: {
                    name: data.name,
                    cnpj: data.cnpj,
                    employees: data.employees,
                    email: data.email,
                    phone: data.phone,
                    site: data.site ?? null,
                    cep: data.cep,
                    address: data.address,
                    number: data.number,
                    complement: data.complement ?? null,
                    city: data.city,
                    state: data.state,
                    about: data.about ?? null,
                    onboardingCompleted: isOnboardingComplete(data),
                },
            });

            return company;

        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            throw new InternalServerErrorException('Erro ao atualizar empresa');
        }
    }

    async getUserWithCompany(userId: number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user?.companyId) throw new InternalServerErrorException('Usuário sem empresa');
        return user;
    }
}