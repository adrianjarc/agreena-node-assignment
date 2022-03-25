import { IsEnum, IsISO31661Alpha3, IsOptional } from 'class-validator';
import { CarbonCertificateStatusEnum } from '../../common/enum/carbon-certificate-status.enum';

export class CarbonCertificateFiltersDto {
  @IsEnum(CarbonCertificateStatusEnum)
  @IsOptional()
  readonly status?: CarbonCertificateStatusEnum;

  @IsISO31661Alpha3()
  @IsOptional()
  readonly country?: string;
}
