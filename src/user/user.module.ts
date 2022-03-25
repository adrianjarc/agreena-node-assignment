import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';
import getEnvPath from '../utils/get-env-path';
import baseConfiguration from '../config/base-configuration';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      load: [baseConfiguration],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
