import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CarbonCertificateStatusEnum } from '../src/common/enum/carbon-certificate-status.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let tokenCerts: string;
  let tokenNoCert: string;
  let transferrableCert: string;
  let availableCert: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tokenCerts = (
      await request(app.getHttpServer()).post('/auth/login').send({
        username: 'testUserCerts',
        password: 'S33dP4ssw0rd!',
      })
    ).body.token;

    tokenNoCert = (
      await request(app.getHttpServer()).post('/auth/login').send({
        username: 'testUserNoCert',
        password: 'S33dP4ssw0rd!',
      })
    ).body.token;
  });

  it('/carbon-certificate (GET) (no token)', () => {
    return request(app.getHttpServer())
      .get('/carbon-certificate')
      .expect(401)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message', 'Unauthorized');
      });
  });

  it('/carbon-certificate (GET)', () => {
    return request(app.getHttpServer())
      .get('/carbon-certificate')
      .set('Authorization', `Bearer ${tokenCerts}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('items');
        expect(body.items).toHaveLength(3);
        transferrableCert = body.items[0].id;
      });
  });

  it('/carbon-certificate (GET)', () => {
    return request(app.getHttpServer())
      .get('/carbon-certificate')
      .set('Authorization', `Bearer ${tokenNoCert}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('items');
        expect(body.items).toHaveLength(0);
      });
  });

  it('/carbon-certificate/filters[status]=available (GET)', () => {
    return request(app.getHttpServer())
      .get('/carbon-certificate')
      .set('Authorization', `Bearer ${tokenCerts}`)
      .query({
        filters: {
          status: CarbonCertificateStatusEnum.AVAILABLE,
        },
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('items');
        availableCert = body.items[0].id;
      });
  });

  it('/carbon-certificate/transfer (PATCH) (non owned certificate)', () => {
    return request(app.getHttpServer())
      .patch(`/carbon-certificate/transfer/${availableCert}`)
      .set('Authorization', `Bearer ${tokenCerts}`)
      .send({
        userId: '6895df0f-65ad-4ed3-b188-f8d029b261ff',
      })
      .expect(403)
      .expect(({ body }) => {
        expect(body).toHaveProperty(
          'message',
          'Certificate does not belong to you',
        );
      });
  });

  it('/carbon-certificate/transfer (PATCH) (owned certificate) (no user)', () => {
    return request(app.getHttpServer())
      .patch(`/carbon-certificate/transfer/${transferrableCert}`)
      .set('Authorization', `Bearer ${tokenCerts}`)
      .send({
        userId: '6895df0f-65ad-4ed3-b188-f8d029b261fe',
      })
      .expect(404)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message', 'User not found');
      });
  });

  it('/carbon-certificate/transfer (PATCH) (owned certificate)', () => {
    return request(app.getHttpServer())
      .patch(`/carbon-certificate/transfer/${transferrableCert}`)
      .set('Authorization', `Bearer ${tokenCerts}`)
      .send({
        userId: '6895df0f-65ad-4ed3-b188-f8d029b261ff',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('ownerName', 'testUserNoCert');
        expect(body).toHaveProperty(
          'status',
          CarbonCertificateStatusEnum.TRANSFERRED,
        );

        return request(app.getHttpServer())
          .patch(`/carbon-certificate/transfer/${transferrableCert}`)
          .set('Authorization', `Bearer ${tokenNoCert}`)
          .send({
            userId: '2666e4ee-1028-4b16-a633-872421979fe7',
          });
      });
  });
});
