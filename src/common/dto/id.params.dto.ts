import { IsUUID } from 'class-validator';

export class IdParamsDto {
  @IsUUID()
  readonly id: string;
}
