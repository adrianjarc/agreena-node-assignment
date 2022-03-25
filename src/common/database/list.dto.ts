import { Transform, Type } from 'class-transformer';
import {
  Allow,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import {
  GenericListInterface,
  ListFilterType,
  ListOrderType,
  PaginatedListInterface,
  PaginationOptionsInterface,
} from '../interfaces/list.interfaces';

export class GenericListQuery {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Transform(({ value }): ListOrderType => {
    return value
      ? value.split(',').map((i: string) => {
          if (i[0] === '-') {
            return [i.substring(1), 'DESC'];
          }
          if (i[0] === '+') {
            return [i.substring(1), 'ASC'];
          }
          return [i, 'ASC'];
        })
      : [];
  })
  @Allow()
  readonly order: ListOrderType;
}

export class GenericList<DtoType> {
  static ITEMS_PROPERTY = 'items';

  readonly items: DtoType[];

  @IsInt()
  readonly limit: number;

  @IsInt()
  @IsOptional()
  readonly total?: number;

  @IsString()
  readonly order: string;

  public static fromGenericListInterface<EntityType, DtoType>(
    list: GenericListInterface<EntityType>,
    converter: (from: EntityType) => DtoType,
  ): GenericList<DtoType> {
    return {
      total: list.total,
      limit: list.limit,
      items: list.items.map(converter),
      order:
        list.order && Array.isArray(list.order)
          ? list.order
              .map((x) => `${x[1] === 'DESC' ? '-' : '+'}${x[0]}`)
              .join()
          : '',
    };
  }
}

export class PaginatedListQuery
  extends GenericListQuery
  implements PaginationOptionsInterface
{
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page?: number;
}

export class PaginatedList<DtoType> extends GenericList<DtoType> {
  @IsInt()
  readonly page: number;

  @ValidateNested()
  readonly filters?: ListFilterType;

  public static fromPaginatedListInterface<EntityType, DtoType>(
    list: PaginatedListInterface<EntityType>,
    converter: (from: EntityType) => DtoType,
  ): PaginatedList<DtoType> {
    return {
      ...super.fromGenericListInterface(list, converter),
      page: list.page,
      filters: list.filters,
    };
  }
}
