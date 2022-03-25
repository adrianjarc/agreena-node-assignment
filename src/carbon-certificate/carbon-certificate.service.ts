import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { CarbonCertificateFiltersDto } from './dto/carbon-certificate.filters.dto';
import {
  ListOrderType,
  PaginationOptionsInterface,
} from '../common/interfaces/list.interfaces';
import { UserEntity } from '../entities/user.entity';
import { CarbonCertificateStatusEnum } from '../common/enum/carbon-certificate-status.enum';

@Injectable()
export class CarbonCertificateService {
  constructor(
    @InjectRepository(CarbonCertificateRepository)
    private readonly carbonCertificateRepository: CarbonCertificateRepository,
  ) {}

  async paginate(
    pagination: PaginationOptionsInterface,
    filters: CarbonCertificateFiltersDto,
    options: {
      count: boolean;
      user: UserEntity;
    },
  ) {
    //  filter to protect from unwanted non-index orders here
    const order: ListOrderType = (pagination?.order || []).filter((x) =>
      ['status', 'country'].includes(x[0]),
    );

    let owner: string | undefined;

    if (
      !filters.status ||
      filters.status !== CarbonCertificateStatusEnum.AVAILABLE
    ) {
      owner = options.user.id;
    }

    return this.carbonCertificateRepository.paginate(
      {
        ...pagination,
        order,
      },
      {
        ...filters,
        status: filters.status ?? CarbonCertificateStatusEnum.AVAILABLE,
        owner,
      },
      options?.count,
    );
  }
}
