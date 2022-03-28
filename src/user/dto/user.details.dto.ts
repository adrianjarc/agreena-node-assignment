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

export class UserDetailsDto {
  @IsUUID()
  readonly id: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;

  @IsString()
  readonly username: string;

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
