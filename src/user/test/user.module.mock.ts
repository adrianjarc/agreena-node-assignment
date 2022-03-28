import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { ConfigModule } from '@nestjs/config';
import getEnvPath from '../../utils/get-env-path';
import baseConfiguration from '../../config/base-configuration';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { UserRepositoryMock } from './user.repository.mock';

@Module({
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
  exports: [UserService],
})
export class UserModuleMock {}
