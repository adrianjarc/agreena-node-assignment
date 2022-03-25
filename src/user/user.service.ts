import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user.create.dto';
import { UserEntity, UserRelations } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserDetailsDto } from './dto/user.details.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserWithCertificates(id: string): Promise<UserDetailsDto> {
    return UserDetailsDto.fromUserEntity(
      await this.userRepository.getById(id, {
        relations: ['carbonCertificates'],
      }),
    );
  }

  async createUser(user: UserCreateDto): Promise<UserEntity> {
    return await this.userRepository.createAndSave(
      user,
      this.configService.get<number>('saltRounds'),
    );
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  async getUserById(
    id: string,
    options: {
      relations?: UserRelations[];
    } = {},
  ): Promise<UserEntity> {
    return this.userRepository.getById(id, options);
  }
}
