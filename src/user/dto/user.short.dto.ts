import { UserEntity } from '../../entities/user.entity';
import { IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserShortDto {
  @ApiModelProperty({
    format: 'uuid',
  })
  @IsUUID()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly username: string;

  static fromUserEntity(userEntity: UserEntity): UserShortDto {
    return {
      id: userEntity.id,
      username: userEntity.username,
    };
  }
}
