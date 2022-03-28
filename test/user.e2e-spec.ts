import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    token = (
      await request(app.getHttpServer()).post('/auth/login').send({
        username: 'testUserCerts',
        password: 'S33dP4ssw0rd!',
      })
    ).body.token;
  });

  it('/user/me (GET) (no token)', () => {
    return request(app.getHttpServer())
      .get('/user/me')
      .expect(401)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message', 'Unauthorized');
      });
  });

  it('/user/me (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('createdAt');
        expect(body).toHaveProperty('updatedAt');
        expect(body).toHaveProperty('username', 'testUserCerts');
        expect(body).toHaveProperty('carbonCertificates');
        expect(body.carbonCertificates).toHaveLength(3);
      });
  });
});
