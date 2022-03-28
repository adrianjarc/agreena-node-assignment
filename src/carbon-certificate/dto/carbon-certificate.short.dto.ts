import {
  IsEnum,
  IsISO31661Alpha3,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CarbonCertificateEntity } from '../../entities/carbon-certificate.entity';
import { CarbonCertificateStatusEnum } from '../../common/enum/carbon-certificate-status.enum';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CarbonCertificateShortDto {
  @ApiModelProperty({
    format: 'uuid',
  })
  @IsUUID()
  readonly id: string;

  @ApiModelProperty({
    enum: Object.values(CarbonCertificateStatusEnum),
  })
  @IsEnum(CarbonCertificateStatusEnum)
  readonly status: CarbonCertificateStatusEnum;

  @ApiModelProperty({
    maxLength: 3,
    minLength: 3,
  })
  @IsISO31661Alpha3()
  @MaxLength(3)
  @MinLength(3)
  readonly country: string;

  @ApiModelPropertyOptional()
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
