import { IsString, IsEmail, IsOptional, MaxLength, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsString()
  @MaxLength(14)
  cnpj: string;

  @IsInt()
  @Type(() => Number)
  employees: number;

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