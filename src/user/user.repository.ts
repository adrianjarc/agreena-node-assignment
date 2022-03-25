import { EntityNotFoundError, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getById(id: string): Promise<UserEntity> {
    try {
      return this.findOneOrFail({ id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }

      throw e;
    }
  }
}
