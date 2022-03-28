import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import getEnvPath from '../utils/get-env-path';
import baseConfiguration from '../config/base-configuration';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserRepositoryMock } from './test/user.repository.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: getEnvPath(),
          load: [baseConfiguration],
        }),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('adds user', async () => {
    const response = await service.createUser({
      username: 'test',
      password: 'test',
    });

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('password');
    expect(response).toHaveProperty('username', 'test');
  });

  it('should return user', async () => {
    const addedUser = await service.createUser({
      username: 'test',
      password: 'test',
    });

    const response = await service.getUserById(addedUser.id);

    expect(response).toHaveProperty('id', addedUser.id);
    expect(response).toHaveProperty('password', addedUser.password);
    expect(response).toHaveProperty('username', addedUser.username);
  });
});
