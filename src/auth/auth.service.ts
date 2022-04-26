import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signUp(email: string, pass: string) {
    const saltRounds = 12;

    //async
    const salt = await bcrypt.genSalt(saltRounds);

    const password = await bcrypt.hash(pass, salt);

    const user = await this.usersService.createUser({
      email,
      password,
    });

    return user;
  }
}
