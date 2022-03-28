import { EntityNotFoundError, EntityRepository, Repository } from 'typeorm';
import { UserEntity, UserRelations } from '../entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { hash } from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getById(
    id: string,
    options: {
      relations?: UserRelations[];
    } = {},
  ): Promise<UserEntity> {
    try {
      return await this.findOneOrFail(
        {
          id,
        },
        {
          relations: options.relations,
        },
      );
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }

      throw e;
    }
  }

  async createAndSave(
    user: UserCreateDto,
    saltRounds: number,
  ): Promise<UserEntity> {
    try {
      const password = await hash(user.password, saltRounds);

      return await this.save(
        this.create({
          username: user.username,
          password,
        }),
      );
    } catch (e) {
      // Because TypeOrm v2 doesn't have duplicate exception specified, we need to catch it like this
      if (
        e.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new ConflictException('User with this username already exists');
      }

      throw e;
    }
  }
}
