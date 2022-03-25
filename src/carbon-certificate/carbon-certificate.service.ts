import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';

@Injectable()
export class CarbonCertificateService {
  constructor(
    @InjectRepository(CarbonCertificateRepository)
    private readonly carbonCertificateRepository: CarbonCertificateRepository,
  ) {}
}
