import {
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UserEntity } from '../../entities/user.entity';
import { Type } from 'class-transformer';
import { CarbonCertificateShortDto } from '../../carbon-certificate/dto/carbon-certificate.short.dto';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDetailsDto {
  @ApiModelProperty({
    format: 'uuid',
  })
  @IsUUID()
  readonly id: string;

  @ApiModelProperty({
    format: 'date-time',
  })
  @IsDate()
  readonly createdAt: Date;

  @ApiModelProperty({
    format: 'date-time',
  })
  @IsDate()
  readonly updatedAt: Date;

  @ApiModelProperty()
  @IsString()
  readonly username: string;

  @ApiModelPropertyOptional({
    type: CarbonCertificateShortDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CarbonCertificateShortDto)
  readonly carbonCertificates?: CarbonCertificateShortDto[];

  static fromUserEntity(userEntity: UserEntity): UserDetailsDto {
    return {
      id: userEntity.id,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      username: userEntity.username,
      carbonCertificates:
        userEntity.carbonCertificates.length > 0
          ? userEntity.carbonCertificates.map(
              CarbonCertificateShortDto.fromCarbonCertificateEntity,
            )
          : undefined,
    };
  }
}
