import { IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class IdParamsDto {
  @ApiModelProperty({
    format: 'uuid',
  })
  @IsUUID()
  readonly id: string;
}
