import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export enum EducationLevel {
  FUNDAMENTAL = 'FUNDAMENTAL',
  MEDIO = 'MEDIO',
  TECNICO = 'TECNICO',
  SUPERIOR = 'SUPERIOR',
  POS_GRADUACAO = 'POS_GRADUACAO',
  MESTRADO = 'MESTRADO',
  DOUTORADO = 'DOUTORADO',
}

export enum SkillLevel {
  BASICO = 'BASICO',
  INTERMEDIARIO = 'INTERMEDIARIO',
  AVANCADO = 'AVANCADO',
  ESPECIALISTA = 'ESPECIALISTA',
}

export enum LanguageLevel {
  BASICO = 'BASICO',
  INTERMEDIARIO = 'INTERMEDIARIO',
  AVANCADO = 'AVANCADO',
  FLUENTE = 'FLUENTE',
  NATIVO = 'NATIVO',
}

export class PriorityOrderDto {
  @IsInt()
  @Min(1)
  priorityId: number;

  @IsInt()
  @Min(1)
  order: number;
}

export class EducationDto {
  @IsEnum(EducationLevel)
  level: EducationLevel;

  @IsOptional()
  @IsString()
  institution?: string;
}

export class ExperienceDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, {
    message: 'startDate deve estar no formato YYYY-MM',
  })
  startDate: string;

  @ValidateIf((o) => !o.current)
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, {
    message: 'endDate deve estar no formato YYYY-MM',
  })
  endDate?: string | null;

  @IsBoolean()
  current: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

export class SkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SkillLevel)
  level: SkillLevel;
}

export class LanguageDto {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsEnum(LanguageLevel)
  level: LanguageLevel;
}

export class CompleteOnboardingDto {
  @IsBoolean()
  discCompleted: boolean;

  @IsArray()
  @IsInt({ each: true })
  interestIds: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriorityOrderDto)
  priorities: PriorityOrderDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EducationDto)
  education?: EducationDto | null;

  @IsBoolean()
  firstJobSeeker: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences: ExperienceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills?: SkillDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @IsOptional()
  @IsNumber()
  avatarIndex?: number | null;

  @IsOptional()
  @IsString()
  avatarUrl?: string | null;
}