import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user.create.dto';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: UserCreateDto): Promise<UserEntity> {
    return await this.userRepository.createAndSave(
      user,
      this.configService.get<number>('saltRounds'),
    );
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  async getUserById(id: string): Promise<UserEntity> {
    return this.userRepository.getById(id);
  }
}
