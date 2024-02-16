// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UUID } from 'crypto';
import { comparePasword, hashPassword } from 'src/shared/common/function';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Login email password
  async login(email: string): Promise<User> {
    const loginemail = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return loginemail;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(id: UUID, updateUserDto: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        // Xử lý trường hợp người dùng không tồn tại
        return null;
      }
      Object.assign(user, updateUserDto);
      return await this.userRepository.save(user);
    }
    catch (error)
    {
      return null;
    }
  }

  
  async updateInfo(id: UUID, updateUserDto: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        // Xử lý trường hợp người dùng không tồn tại
        return null;
      }
      const hash = hashPassword(updateUserDto.password)
      const iScomparePass = comparePasword(user.password, hash);
      //Mã hóa password
      updateUserDto.password = hash;

      // console.log('----------hash-------------------');
      // console.log(hash);
      // console.log(compare);
      // console.log('----------hash-------------------');

      // console.log(user.email); 
      // const infoUpdate = new User;
      // infoUpdate.id = user.id;
      // infoUpdate.email = user.email;
      // infoUpdate.password = hash;
      // console.log(infoUpdate.email); 

      Object.assign(user, updateUserDto);
      return await this.userRepository.save(updateUserDto);
    }
    catch (error)
    {
      return null;
    }
  }
}
