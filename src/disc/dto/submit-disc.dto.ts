import { IsIn, IsInt, IsPositive } from 'class-validator';

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
  question3Id?: number;

  @IsIn([...PROFILES, null, undefined])
  answer3?: string;
}