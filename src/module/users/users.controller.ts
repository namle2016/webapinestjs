import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { HttMessage, HttpStatus } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { Public } from 'src/auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
 
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @Post('register')
  // async create(@Body() user: User): Promise<User> {
  //   return this.userService.create(user);
  // }

  // @Put('updateuser')
  // async update(@Body() updateUserDto: Partial<User>): Promise<User | null> {
  //   console.log(updateUserDto.id);
  //   return this.userService.update(updateUserDto.id, updateUserDto);
  // }

  @Post('register')
  async create(@Body() user: User){
    const create = await this.userService.create(user);
    if (create) {
      console.log('Create successful:', create);
      // Hoặc thực hiện các xử lý khác theo logic của bạn
      return new ResponseData<User>(null, HttpStatus.ERROR, HttMessage.ERROR);
    } else {
      console.log('User not found or create failed.');
      return new ResponseData<User>(create, HttpStatus.SUCCESS, HttMessage.SUCCESS);
    }
  }

  @Put('updateuser')
  async update(@Body() updateUserDto: Partial<User>) {
    const update = await this.userService.update(updateUserDto.id, updateUserDto);
    if (update) {
      console.log('Update successful:', update);
      // Hoặc thực hiện các xử lý khác theo logic của bạn
      return new ResponseData<User>(update, HttpStatus.SUCCESS, HttMessage.SUCCESS);
      
    } else {
      console.log('User not found or update failed.');
      return new ResponseData<User>(null, HttpStatus.ERROR, HttMessage.ERROR);
    }
  }
  
  @Public()
  @Put('updateInfo')
  async updateInfo(@Body() updateUserDto: Partial<User>) {
    const update = await this.userService.updateInfo(updateUserDto.id, updateUserDto);
    if (update) {
      console.log('Update successful:', update);
      // Hoặc thực hiện các xử lý khác theo logic của bạn
      return new ResponseData<User>(update, HttpStatus.SUCCESS, HttMessage.SUCCESS);
      
    } else {
      console.log('User not found or update failed.');
      return new ResponseData<User>(null, HttpStatus.ERROR, HttMessage.ERROR);
    }
  }
}
