import { IsUUID } from 'class-validator';

export class CarbonCertificateTransferDto {
  @IsUUID()
  readonly userId: string;
}
