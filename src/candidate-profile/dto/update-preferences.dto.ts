import {
  IsOptional,
  IsInt,
  IsNumber,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ContractType, ExperienceLevel } from '@prisma/client';

export class UpdatePreferencesDto {
  @IsOptional()
  @IsInt()
  desiredSectorId?: number;

  @IsOptional()
  @IsInt()
  desiredPositionId?: number;

  @IsOptional()
  @IsNumber()
  salaryMin?: number;

  @IsOptional()
  @IsNumber()
  salaryMax?: number;

  @IsOptional()
  @IsBoolean()
  salaryNegotiable?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(ContractType, { each: true })
  contractTypes?: ContractType[];

  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;
}
