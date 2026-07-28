import { IsOptional, IsInt, IsNumber, IsBoolean, IsArray, ArrayMinSize, IsString } from 'class-validator';

export class UpdatePreferencesDto {
  @IsOptional() @IsInt() desiredSectorId?: number;
  @IsOptional() @IsInt() desiredPositionId?: number;

  @IsOptional() @IsNumber() salaryMin?: number;
  @IsOptional() @IsNumber() salaryMax?: number;
  @IsOptional() @IsBoolean() salaryNegotiable?: boolean;

  @IsOptional() @IsArray() contractTypes?: string[];
  @IsOptional() @IsString() experienceLevel?: string;
}