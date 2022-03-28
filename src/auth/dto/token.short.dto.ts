import { IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../../entities/user.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class TokenShortDto {
  @ApiModelProperty({
    format: 'uuid',
  })
  @IsUUID()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly token: string;

  static fromUserEntity(userEntity: UserEntity, token: string): TokenShortDto {
    return {
      id: userEntity.id,
      token,
    };
  }
}
