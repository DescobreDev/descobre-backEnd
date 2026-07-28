import { IsString, IsOptional, IsBoolean, Matches } from 'class-validator';

export class CreateExperienceDto {
  @IsString() company: string;
  @IsString() position: string;
  @IsOptional() @IsString() description?: string;

  @Matches(/^\d{4}-\d{2}$/) startDate: string;
  @IsOptional() @Matches(/^\d{4}-\d{2}$/) endDate?: string;

  @IsBoolean() current: boolean;
}

export class UpdateExperienceDto {
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() position?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @Matches(/^\d{4}-\d{2}$/) startDate?: string;
  @IsOptional() @Matches(/^\d{4}-\d{2}$/) endDate?: string;
  @IsOptional() @IsBoolean() current?: boolean;
}