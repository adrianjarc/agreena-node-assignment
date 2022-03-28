import { IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CarbonCertificateTransferDto {
  @ApiModelProperty({
    format: 'uuid',
  })
  @IsUUID()
  readonly userId: string;
}
