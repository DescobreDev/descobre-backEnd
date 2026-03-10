import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService){}

    async createCompany(data: CreateCompanyDto) {
        // const company = await this.prisma.company.create({
        //     data: {
                
        //     },
        // });

        return data;
    }
    
}
