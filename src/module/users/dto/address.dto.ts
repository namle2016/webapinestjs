import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/shared/common/AbstractDto';
import { AddressEntity } from '../entities/address.entity';
import { UserDto } from './user.dto';



export type AddressDtoOptions = Partial<{}>;

export class AddressDto extends AbstractDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nationalId: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  district: string;

  @ApiProperty()
  wards: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  isDefault: boolean;

  constructor(address: AddressEntity, options?: AddressDtoOptions) {
    super(address);
    this.fullName = address.fullName;
    this.email = address.email;
    this.nationalId = address.nationalId;
    this.city = address.city;
    this.district = address.district;
    this.wards = address.wards;
    this.street = address.street;
    this.phoneNumber = address.phoneNumber;
    this.zipCode = address.zipCode;
    this.isDefault = address.isDefault;
    if (address.user) {
      this.user = address.user.toDto();
    }
  }
}
