import { IsString, IsEnum } from 'class-validator';

export enum SkillLevel { BASICO = 'BASICO', INTERMEDIARIO = 'INTERMEDIARIO', AVANCADO = 'AVANCADO' }

export class CreateSkillDto {
  @IsString() name: string;
  @IsEnum(SkillLevel) level: SkillLevel;
}