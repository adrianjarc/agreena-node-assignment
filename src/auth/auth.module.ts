import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getEnvPath from '../utils/get-env-path';
import baseConfiguration from '../config/base-configuration';
import jwtConfiguration from '../config/jwt-configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      load: [baseConfiguration, jwtConfiguration],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: getEnvPath(),
          load: [baseConfiguration, jwtConfiguration],
        }),
      ],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.expiresIn'),
            issuer: configService.get('api'),
          },
          verifyOptions: {
            issuer: configService.get('api'),
            ignoreExpiration: false,
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
