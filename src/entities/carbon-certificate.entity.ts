import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarbonCertificateStatusEnum } from '../common/enum/carbon-certificate-status.enum';
import { UserEntity } from './user.entity';
import { EntitiesEnum } from '../common/enum/entities.enum';

@Entity('carbon_certificates')
export class CarbonCertificateEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  readonly updatedAt: Date;

  @Column({
    type: 'enum',
    enum: CarbonCertificateStatusEnum,
    default: CarbonCertificateStatusEnum.AVAILABLE,
  })
  status: CarbonCertificateStatusEnum;

  @Column('varchar', {
    length: 3,
  })
  country: string;

  @Column('uuid', {
    nullable: true,
  })
  ownerId?: string;

  @ManyToOne(EntitiesEnum.USER, 'carbonCertificates')
  @JoinColumn({
    name: 'ownerId',
    referencedColumnName: 'id',
  })
  owner?: UserEntity;
}
