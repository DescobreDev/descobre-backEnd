import { IsArray, ArrayMinSize, IsInt } from 'class-validator';

export class UpdateInterestsDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Selecione ao menos 1 interesse.' })
  @IsInt({ each: true })
  interestIds: number[];
}