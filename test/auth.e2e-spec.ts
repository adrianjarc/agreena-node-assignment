import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) (no user)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'T3stP4ssw0rd!',
      })
      .expect(401)
      .expect(({ body }) => {
        expect(body).toHaveProperty(
          'message',
          'Username or password incorrect',
        );
      });
  });

  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'test',
        password: 'T3stP4ssw0rd!',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('username', 'test');
      });
  });

  it('/auth/signup (POST) (existing user)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'test',
        password: 'T3stP4ssw0rd!',
      })
      .expect(409)
      .expect(({ body }) => {
        expect(body).toHaveProperty(
          'message',
          'User with this username already exists',
        );
      });
  });

  it('/auth/login (POST) (wrong password)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'T3stP4ssw0rd!!',
      })
      .expect(401)
      .expect(({ body }) => {
        expect(body).toHaveProperty(
          'message',
          'Username or password incorrect',
        );
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'T3stP4ssw0rd!',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('token');
      });
  });
});
