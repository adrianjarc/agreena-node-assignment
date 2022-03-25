import { UserEntity } from '../../entities/user.entity';
import { IsString, IsUUID } from 'class-validator';

export class UserShortDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly username: string;

  static fromUserEntity(userEntity: UserEntity): UserShortDto {
    return {
      id: userEntity.id,
      username: userEntity.username,
    };
  }
}
