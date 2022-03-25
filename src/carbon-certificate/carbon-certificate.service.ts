import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarbonCertificateRepository } from './carbon-certificate.repository';
import { CarbonCertificateFiltersDto } from './dto/carbon-certificate.filters.dto';
import {
  ListOrderType,
  PaginationOptionsInterface,
} from '../common/interfaces/list.interfaces';
import { UserEntity } from '../entities/user.entity';
import { CarbonCertificateStatusEnum } from '../common/enum/carbon-certificate-status.enum';
import { CarbonCertificateTransferDto } from './dto/carbon-certificate.transfer.dto';
import { CarbonCertificateShortDto } from './dto/carbon-certificate.short.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CarbonCertificateService {
  constructor(
    private readonly userService: UserService,

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

    let ownerId: string | undefined;

    // If no status in filters or if status is not available, add owner id to filter by
    if (
      !filters.status ||
      filters.status !== CarbonCertificateStatusEnum.AVAILABLE
    ) {
      ownerId = options.user.id;
    }

    return this.carbonCertificateRepository.paginate(
      {
        ...pagination,
        order,
      },
      {
        ...filters,
        status: filters.status ? filters.status : undefined,
        ownerId,
      },
      options?.count,
    );
  }

  async transfer(
    id: string,
    user: UserEntity,
    data: CarbonCertificateTransferDto,
  ): Promise<CarbonCertificateShortDto> {
    const certificate = await this.carbonCertificateRepository.getById(id);

    if (certificate.ownerId !== user.id) {
      throw new ForbiddenException('Certificate does not belong to you');
    }

    const toUser = await this.userService.getUserById(data.userId);

    return CarbonCertificateShortDto.fromCarbonCertificateEntity(
      await this.carbonCertificateRepository.transfer(certificate, toUser),
    );
  }
}
