import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService, private jwtService: JwtService,) { }

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
                    data:
                    {
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
}