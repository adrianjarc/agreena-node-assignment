import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';
import { CarbonCertificateStatusEnum } from '../common/enum/carbon-certificate-status.enum';

export class seed1648211279050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('S33dP4ssw0rd!', 10);

    const users: { username: string; password: string }[] = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        username: `seedUser${i + 1}`,
        password,
      });
    }

    await queryRunner.query(`INSERT INTO "users"("username", "password")
VALUES ${users
      .map((user) => `(e'${user.username}', e'${user.password}')`)
      .join(', ')}`);

    const dbUsers = await queryRunner.query('SELECT id FROM users');

    let certsGenerated = 0;

    const certs: {
      status: CarbonCertificateStatusEnum;
      country: string;
      ownerId: string | null;
    }[] = [];

    for (let i = 0; i < 5; i++) {
      const numCertsToGenerate = Math.ceil(Math.random() * 10 + 1);

      const index = Math.floor(Math.random() * dbUsers.length);

      const owner = dbUsers.splice(index, 1)[0];

      for (let j = 0; j < numCertsToGenerate; j++) {
        const status =
          Math.floor(Math.random() * 10) % 2 === 0
            ? CarbonCertificateStatusEnum.OWNED
            : CarbonCertificateStatusEnum.TRANSFERRED;

        certs.push({
          status,
          country: 'SLO',
          ownerId: owner.id,
        });
      }

      certsGenerated += numCertsToGenerate;
    }

    for (let i = 0; i < 100 - certsGenerated; i++) {
      certs.push({
        status: CarbonCertificateStatusEnum.AVAILABLE,
        country: 'SLO',
        ownerId: null,
      });
    }

    await queryRunner.query(`INSERT INTO "carbon_certificates"("status", "country", "ownerId")
VALUES ${certs
      .map(
        (cert) =>
          `(e'${cert.status}', e'${cert.country}', ${
            cert.ownerId === null ? 'null' : `e'${cert.ownerId}'`
          })`,
      )
      .join(', ')}`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "carbon_certificates"');
    await queryRunner.query('DELETE FROM "users"');
  }
}
