import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { CarbonCertificateService } from './carbon-certificate.service';
import { CarbonCertificateController } from './carbon-certificate.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarbonCertificateRepository]),
    UserModule,
  ],
  controllers: [CarbonCertificateController],
  providers: [CarbonCertificateService],
  exports: [CarbonCertificateService],
})
export class CarbonCertificateModule {}
