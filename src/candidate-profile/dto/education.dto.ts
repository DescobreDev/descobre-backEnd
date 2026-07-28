import { IsString, IsOptional, IsBoolean, Matches } from 'class-validator';

export class UpdateEducationDto {
  @IsString() level: string;
  @IsOptional() @IsString() institution?: string;
  @IsOptional() @IsString() course?: string;
  @IsOptional() @Matches(/^\d{4}-\d{2}$/) startDate?: string;
  @IsOptional() @IsBoolean() current?: boolean;
}