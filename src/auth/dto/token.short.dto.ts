import { IsString, IsUUID } from 'class-validator';
import { UserEntity } from '../../entities/user.entity';

export class TokenShortDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly token: string;

  static fromUserEntity(userEntity: UserEntity, token: string): TokenShortDto {
    return {
      id: userEntity.id,
      token,
    };
  }
}
