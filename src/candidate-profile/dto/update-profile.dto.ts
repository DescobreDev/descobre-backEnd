import { IsOptional, IsString, IsBoolean, IsInt, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsInt() avatarIndex?: number;
  @IsOptional() @IsString() avatarUrl?: string;

  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;

  @IsOptional() @IsBoolean() acceptsTravel?: boolean;
}