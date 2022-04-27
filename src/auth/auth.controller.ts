import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/createUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body.email, body.password);
    return user;
  }

  //@UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto) {
    const token = await this.authService.signUserIn(body.email, body.password);
    const user = { ...token };

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log(req);
    return req.user;
  }
}
