import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signUp(@Body() body) {
    return this.authService.signUp(body.email, body.password);
  }
}
