// dto/update-priorities.dto.ts
import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PriorityItem {
  priorityId: number;
  order: number;
}

export class UpdatePrioritiesDto {
  @IsArray()
  @ArrayMinSize(3, {
    message: 'Selecione ao menos 3 prioridades profissionais.',
  })
  @ValidateNested({ each: true })
  @Type(() => PriorityItem)
  priorities: PriorityItem[];
}
