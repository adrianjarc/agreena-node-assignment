import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntitiesEnum } from '../common/enum/entities.enum';
import { CarbonCertificateEntity } from './carbon-certificate.entity';

@Entity('users')
export class UserEntity {
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

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(EntitiesEnum.CARBON_CERTIFICATE, 'owner')
  carbonCertificates?: CarbonCertificateEntity[];
}
