import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}

    async createCompany(data: CreateCompanyDto) {
        const existing = await this.prisma.company.findUnique({
            where: { cnpj: data.cnpj }
        });

        if (existing) {
            throw new ConflictException('CNPJ já cadastrado');
        }

        try {
            return await this.prisma.company.create({
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
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar empresa');
        }
    }
}