import { IsDate, IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../../entities/user.entity';

export class UserDetailsDto {
  @IsUUID()
  readonly id: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;

  @IsString()
  readonly username: string;

  static fromUserEntity(userEntity: UserEntity): UserDetailsDto {
    return {
      id: userEntity.id,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      username: userEntity.username,
    };
  }
}
