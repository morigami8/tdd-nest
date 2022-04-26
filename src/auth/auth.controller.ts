import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body.email, body.password);
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto) {
    const user = await this.authService.signUserIn(body.email, body.password);

    return user;
  }
}
