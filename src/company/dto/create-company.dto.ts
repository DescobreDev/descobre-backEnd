import { IsString, IsEmail, IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName: string;

  @IsString()
  @MaxLength(14)
  cnpj: string;

  @IsNumberString()
  employees: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  site?: string;

  @IsString()
  cep: string;

  @IsString()
  address: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  city: string;

  @IsString()
  @MaxLength(2)
  state: string;

  @IsOptional()
  @IsString()
  about?: string;
}