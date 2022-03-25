import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CarbonCertificateEntity } from '../../entities/carbon-certificate.entity';
import { CarbonCertificateStatusEnum } from '../../common/enum/carbon-certificate-status.enum';

export class CarbonCertificateShortDto {
  @IsUUID()
  readonly id: string;

  @IsEnum(CarbonCertificateStatusEnum)
  readonly status: CarbonCertificateStatusEnum;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  readonly country: string;

  @IsString()
  @IsOptional()
  readonly ownerName?: string;

  static fromCarbonCertificateEntity(
    carbonCertificateEntity: CarbonCertificateEntity,
  ): CarbonCertificateShortDto {
    return {
      id: carbonCertificateEntity.id,
      status: carbonCertificateEntity.status,
      country: carbonCertificateEntity.country,
      ownerName: carbonCertificateEntity.owner?.username,
    };
  }
}
