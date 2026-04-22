// src/auth/auth.dto.ts
import { IsEmail, IsString, MinLength, Length, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString({ message: 'Nome é obrigatório.' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;
}

export class VerifyEmailDto {
  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  @Length(6, 6, { message: 'O código deve ter 6 dígitos.' })
  code: string;
}

export class ResendCodeDto {
  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  email: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}