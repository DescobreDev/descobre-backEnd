import { IsEnum, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class InterviewResponseDto {
  @IsEnum(['CONFIRMED', 'DECLINED', 'RESCHEDULED'])
  status: 'CONFIRMED' | 'DECLINED' | 'RESCHEDULED';

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsISO8601()
  proposedAt?: string;
}
