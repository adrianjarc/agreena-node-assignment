import { EntityRepository, Repository } from 'typeorm';
import { CarbonCertificateEntity } from '../entities/carbon-certificate.entity';

@EntityRepository(CarbonCertificateEntity)
export class CarbonCertificateRepository extends Repository<CarbonCertificateEntity> {}
