import { IsString, IsEnum } from 'class-validator';

export enum LanguageLevel {
  BASICO = 'BASICO',
  INTERMEDIARIO = 'INTERMEDIARIO',
  AVANCADO = 'AVANCADO',
  FLUENTE = 'FLUENTE',
}

export class CreateLanguageDto {
  @IsString() language: string;
  @IsEnum(LanguageLevel) level: LanguageLevel;
}
