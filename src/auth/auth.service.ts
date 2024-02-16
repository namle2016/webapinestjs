import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
import { UserService } from 'src/module/users/users.service';
import { comparePasword } from 'src/shared/common/function';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.login(email);
    if (user) {
      const iScomparePass = comparePasword(password, user.password);
      if(iScomparePass)
      {
        const payload = { email: user.email, sub: user.password };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      else
      {
        throw new UnauthorizedException();
      }
    }
    else
    {
      throw new UnauthorizedException();
    }
  }
}
