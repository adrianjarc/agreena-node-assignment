import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CarbonCertificateService } from './carbon-certificate.service';
import { PaginatedList, PaginatedListQuery } from '../common/database/list.dto';
import { CarbonCertificateShortDto } from './dto/carbon-certificate.short.dto';
import { CarbonCertificateFiltersDto } from './dto/carbon-certificate.filters.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/decorator/user';
import { UserEntity } from '../entities/user.entity';

@Controller('carbon-certificate')
@UseGuards(JwtAuthGuard)
export class CarbonCertificateController {
  constructor(
    private readonly carbonCertificateService: CarbonCertificateService,
  ) {}

  @Get()
  async list(
    @Query() pagination: PaginatedListQuery,
    @Query('filters') filters: CarbonCertificateFiltersDto,
    @User() user: UserEntity,
  ): Promise<PaginatedList<CarbonCertificateShortDto>> {
    const List = await this.carbonCertificateService.paginate(
      pagination,
      filters,
      {
        count: true,
        user,
      },
    );

    return PaginatedList.fromPaginatedListInterface(
      List,
      CarbonCertificateShortDto.fromCarbonCertificateEntity,
    );
  }
}
