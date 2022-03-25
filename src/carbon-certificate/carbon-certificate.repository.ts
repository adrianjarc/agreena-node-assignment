import { EntityNotFoundError, EntityRepository, Repository } from 'typeorm';
import { CarbonCertificateEntity } from '../entities/carbon-certificate.entity';
import {
  PaginatedListInterface,
  PaginationOptionsInterface,
} from '../common/interfaces/list.interfaces';
import { paginateQueryBuilder } from '../common/database/list.helper';
import { CarbonCertificateStatusEnum } from '../common/enum/carbon-certificate-status.enum';
import { NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(CarbonCertificateEntity)
export class CarbonCertificateRepository extends Repository<CarbonCertificateEntity> {
  async getById(id: string): Promise<CarbonCertificateEntity> {
    try {
      return await this.findOneOrFail({ id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Carbon certificate not found');
      }

      throw e;
    }
  }

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

  async transfer(
    certificate: CarbonCertificateEntity,
    toUser: UserEntity,
  ): Promise<CarbonCertificateEntity> {
    certificate.ownerId = toUser.id;

    certificate = await this.save(certificate);

    certificate.owner = toUser;

    return certificate;
  }
}
