import { UserEntity, UserRelations } from '../../entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from '../dto/user.create.dto';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

export class UserRepositoryMock {
  private users: UserEntity[] = [];

  async getById(
    id: string,
    options: {
      relations?: UserRelations[];
    } = {},
  ): Promise<UserEntity> {
    const user = this.users.find((usr) => usr.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createAndSave(
    user: UserCreateDto,
    saltRounds: number,
  ): Promise<UserEntity> {
    const password = await hash(user.password, saltRounds);

    if (this.users.find((usr) => usr.username === user.username)) {
      throw new ConflictException('User with this username already exists');
    }

    const userEntity: UserEntity = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      username: user.username,
      password,
    };

    this.users.push(userEntity);

    return userEntity;
  }
}
