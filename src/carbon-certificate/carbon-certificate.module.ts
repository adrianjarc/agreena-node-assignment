import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { CarbonCertificateService } from './carbon-certificate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificateRepository])],
  providers: [CarbonCertificateService],
  exports: [CarbonCertificateService],
})
export class CarbonCertificateModule {}
