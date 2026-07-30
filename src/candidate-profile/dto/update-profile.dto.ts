import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() phone?: string;

  @IsOptional() @IsInt() avatarIndex?: number;
  @IsOptional() @IsString() avatarUrl?: string;

  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;

  @IsOptional() @IsBoolean() acceptsTravel?: boolean;
}