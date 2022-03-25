import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificateService } from './carbon-certificate.service';

describe('CarbonCertificateService', () => {
  let service: CarbonCertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonCertificateService],
    }).compile();

    service = module.get<CarbonCertificateService>(CarbonCertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
