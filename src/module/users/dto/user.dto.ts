import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { AbstractDto } from 'src/shared/common/AbstractDto';
import { UserRole } from 'src/shared/common/user-role.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { NationalProfileDto } from './national-profile.dto';
import { GenderEnum } from 'src/shared/common/app-settings.enum';
import { User } from '../entities/user.entity';
import { AddressDto } from './address.dto';
import { convertStringToArray } from 'src/shared/common/utils';
export type UserDtoOptions = Partial<{
  isPublicUser: boolean;
}>;

export class UserDto extends AbstractDto{
  @ApiProperty()
  staffCode: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  national: NationalProfileDto;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  permission: string[];

  @ApiProperty()
  address: AddressDto[];

  constructor(user: User, options?: UserDtoOptions) {
    super(user);
    this.staffCode = user.staffCode;
    this.role = user.role;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.avatar = user.avatar;
    if (user.national) {
      this.national = user.national;
    }
    this.gender = user.gender;
    this.phoneNumber = user.phoneNumber;
    if (user.permission) {
      this.permission = convertStringToArray(user.permission);
    }
    this.deletedAt = user.deletedAt;
  }
}
