import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { AddressDto, AddressDtoOptions } from '../dto/address.dto';
import { AbstractEntity } from 'src/shared/common/abstract.entity';
import { UseDto } from 'src/shared/common/use-dto.decorator';

@Entity('address')
@UseDto(AddressDto)
export class AddressEntity extends AbstractEntity<AddressDto, AddressDtoOptions> {
  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  nationalId: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  wards: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  zipCode: string;
 
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: false })
  isDefault: boolean;
}
