import {Body,Controller,Get,HttpCode,HttpStatus,Post,Request,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const login = await this.authService.signIn(signInDto.email, signInDto.password);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Get('profile')
  getProfile() {
    return "OK";
  }
 
}
