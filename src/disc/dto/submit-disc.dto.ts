import { IsIn, IsInt, IsOptional, IsPositive } from 'class-validator';

const PROFILES = ['EXECUTOR', 'COMMUNICATOR', 'ANALYST', 'PLANNER'] as const;

export class SubmitDiscDto {
  @IsInt()
  @IsPositive()
  question1Id: number;

  @IsIn(PROFILES)
  answer1: string;

  @IsInt()
  @IsPositive()
  question2Id: number;

  @IsIn(PROFILES)
  answer2: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  question3Id?: number;

  @IsOptional()
  @IsIn(PROFILES)
  answer3?: string;
}