import {MigrationInterface, QueryRunner} from "typeorm";

export class addCarbonCertificates1648202633328 implements MigrationInterface {
    name = 'addCarbonCertificates1648202633328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('user', 'users')
        await queryRunner.query(`CREATE TYPE "public"."carbon_certificates_status_enum" AS ENUM('available', 'owned', 'transferred')`);
        await queryRunner.query(`CREATE TABLE "carbon_certificates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."carbon_certificates_status_enum" NOT NULL DEFAULT 'available', "country" character varying(3) NOT NULL, "ownerId" uuid, CONSTRAINT "PK_26ed7cc978758fe4e38634db9fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carbon_certificates" ADD CONSTRAINT "FK_3d8a68cb36ce2b6626ec6bc0ae8" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_certificates" DROP CONSTRAINT "FK_3d8a68cb36ce2b6626ec6bc0ae8"`);
        await queryRunner.query(`DROP TABLE "carbon_certificates"`);
        await queryRunner.query(`DROP TYPE "public"."carbon_certificates_status_enum"`);
        await queryRunner.renameTable('users', 'user');
    }

}
