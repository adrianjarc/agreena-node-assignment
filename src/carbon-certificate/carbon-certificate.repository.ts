import { EntityRepository, Repository } from 'typeorm';
import { CarbonCertificateEntity } from '../entities/carbon-certificate.entity';
import {
  PaginatedListInterface,
  PaginationOptionsInterface,
} from '../common/interfaces/list.interfaces';
import { paginateQueryBuilder } from '../common/database/list.helper';
import { CarbonCertificateStatusEnum } from '../common/enum/carbon-certificate-status.enum';

@EntityRepository(CarbonCertificateEntity)
export class CarbonCertificateRepository extends Repository<CarbonCertificateEntity> {
  async paginate(
    pagination: PaginationOptionsInterface,
    filters: {
      status?: CarbonCertificateStatusEnum;
      country?: string;
      owner?: string;
    } = {},
    count = false,
  ): Promise<PaginatedListInterface<CarbonCertificateEntity>> {
    const alias = 'carbonCertificate';
    const query = this.createQueryBuilder(alias);

    if (filters.owner) {
      query.andWhere(`${alias}.ownerId = : ownerId`, {
        ownerId: filters.owner,
      });
    }

    if (filters.status) {
      query.andWhere(`${alias}.status IN (:...statuses)`, {
        statuses: filters.status,
      });
    }

    if (filters.country) {
      query.andWhere('${alias}.country = :country', {
        country: filters.country,
      });
    }

    return {
      filters,
      ...(await paginateQueryBuilder(query, pagination, count)),
    };
  }
}
