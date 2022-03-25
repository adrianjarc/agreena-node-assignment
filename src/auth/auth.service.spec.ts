import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getEnvPath from '../utils/get-env-path';
import baseConfiguration from '../config/base-configuration';
import jwtConfiguration from '../config/jwt-configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
