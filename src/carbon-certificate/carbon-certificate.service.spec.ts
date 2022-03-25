import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificateService } from './carbon-certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { UserModule } from '../user/user.module';

describe('CarbonCertificateService', () => {
  let service: CarbonCertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([CarbonCertificateRepository]),
        UserModule,
      ],
      providers: [CarbonCertificateService],
    }).compile();

    service = module.get<CarbonCertificateService>(CarbonCertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
