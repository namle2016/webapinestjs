// user.entity.ts
import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/shared/common/user-role.enum';
import { NationalProfileDto } from '../dto/national-profile.dto';
import { USER_AVATAR_DEFAULT } from 'src/shared/common/file-path.enum';
import { GenderEnum } from 'src/shared/common/app-settings.enum';
import { AddressEntity } from './address.entity';
import { AbstractEntity } from 'src/shared/common/abstract.entity';
import { UserDto, UserDtoOptions } from '../dto/user.dto';

@Entity()
@Index('idx_user_id', ['id'])
export class User extends AbstractEntity<UserDto, UserDtoOptions> {

  @PrimaryGeneratedColumn()
  id: UUID;
 
  @Column({ nullable: true, unique: true })
  staffCode: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column()
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  // https://restcountries.com/v3.1/all?fields=name,flags
  @Column({ nullable: true, type: 'jsonb' })
  national: NationalProfileDto;

  @Column({ default: USER_AVATAR_DEFAULT })
  avatar: string;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.MALE })
  gender: GenderEnum;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Exclude()
  @Column({ nullable: true })
  otp: string;

  @Exclude()
  @Column({ nullable: true, type: 'timestamptz' })
  otpSetAt: Date;

  @Column({ default: '' })
  permission: string;

   @OneToMany(() => AddressEntity, (address) => address.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  address: AddressEntity[];
}
