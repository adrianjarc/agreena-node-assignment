import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { CarbonCertificateService } from './carbon-certificate.service';
import { CarbonCertificateController } from './carbon-certificate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificateRepository])],
  controllers: [CarbonCertificateController],
  providers: [CarbonCertificateService],
  exports: [CarbonCertificateService],
})
export class CarbonCertificateModule {}
