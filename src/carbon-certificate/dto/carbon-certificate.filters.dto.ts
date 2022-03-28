import { IsEnum, IsISO31661Alpha3, IsOptional } from 'class-validator';
import { CarbonCertificateStatusEnum } from '../../common/enum/carbon-certificate-status.enum';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CarbonCertificateFiltersDto {
  @ApiModelPropertyOptional({
    enum: Object.values(CarbonCertificateStatusEnum),
  })
  @IsEnum(CarbonCertificateStatusEnum)
  @IsOptional()
  readonly status?: CarbonCertificateStatusEnum;

  @ApiModelPropertyOptional({
    format: '',
  })
  @IsISO31661Alpha3()
  @IsOptional()
  readonly country?: string;
}
