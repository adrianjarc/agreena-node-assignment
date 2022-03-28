import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificateService } from './carbon-certificate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { CarbonCertificateRepositoryMock } from './test/carbon-certificate.repository.mock';
import { UserModuleMock } from '../user/test/user.module.mock';

describe('CarbonCertificateService', () => {
  let service: CarbonCertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModuleMock],
      providers: [
        CarbonCertificateService,

        {
          provide: getRepositoryToken(CarbonCertificateRepository),
          useClass: CarbonCertificateRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CarbonCertificateService>(CarbonCertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
