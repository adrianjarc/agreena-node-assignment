import { UserEntity } from '../../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CarbonCertificateEntity } from '../../entities/carbon-certificate.entity';
import {
  PaginatedListInterface,
  PaginationOptionsInterface,
} from '../../common/interfaces/list.interfaces';
import { CarbonCertificateStatusEnum } from '../../common/enum/carbon-certificate-status.enum';

export class CarbonCertificateRepositoryMock {
  private carbonCertificates: CarbonCertificateEntity[] = [];

  async getById(id: string): Promise<CarbonCertificateEntity> {
    const certificate = this.carbonCertificates.find((cert) => cert.id === id);

    if (!certificate) {
      throw new NotFoundException('Carbon certificate not found');
    }

    return certificate;
  }

  async paginate(
    pagination: PaginationOptionsInterface,
    filters: {
      status?: CarbonCertificateStatusEnum;
      country?: string;
      ownerId?: string;
    } = {},
    count = false,
  ): Promise<PaginatedListInterface<CarbonCertificateEntity>> {
    return {
      filters,
      items: this.carbonCertificates,
      page: 0,
      limit: 0,
    };
  }

  async transfer(
    certificate: CarbonCertificateEntity,
    toUser: UserEntity,
  ): Promise<CarbonCertificateEntity> {
    certificate.ownerId = toUser.id;
    certificate.status = CarbonCertificateStatusEnum.TRANSFERRED;

    certificate.owner = toUser;

    return certificate;
  }
}
