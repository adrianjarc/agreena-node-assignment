import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarbonCertificateService } from './carbon-certificate.service';
import { PaginatedList, PaginatedListQuery } from '../common/database/list.dto';
import { CarbonCertificateShortDto } from './dto/carbon-certificate.short.dto';
import { CarbonCertificateFiltersDto } from './dto/carbon-certificate.filters.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/decorator/user';
import { UserEntity } from '../entities/user.entity';
import { IdParamsDto } from '../common/dto/id.params.dto';
import { CarbonCertificateTransferDto } from './dto/carbon-certificate.transfer.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedListResponse } from '../common/decorator/api-paginated-list-response.decorator';
import { ApiFilterQuery } from '../common/decorator/api-filter-query';

@ApiTags('Carbon Certificates')
@ApiBearerAuth()
@Controller('carbon-certificate')
@UseGuards(JwtAuthGuard)
export class CarbonCertificateController {
  constructor(
    private readonly carbonCertificateService: CarbonCertificateService,
  ) {}

  @ApiOperation({ summary: 'List' })
  @ApiFilterQuery('filters', CarbonCertificateFiltersDto)
  @ApiPaginatedListResponse({
    response: ApiOkResponse,
    model: CarbonCertificateShortDto,
  })
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

  @ApiOperation({ summary: 'Transfer certificate' })
  @ApiOkResponse({ type: CarbonCertificateShortDto })
  @Patch('transfer/:id')
  async transferCertificate(
    @Param() params: IdParamsDto,
    @Body() data: CarbonCertificateTransferDto,
    @User() user: UserEntity,
  ): Promise<CarbonCertificateShortDto> {
    return await this.carbonCertificateService.transfer(params.id, user, data);
  }
}
