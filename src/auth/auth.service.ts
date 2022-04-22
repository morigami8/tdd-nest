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

    // const salt = randomBytes(8).toString('hex');

    // const hash = (await scrypt(pass, salt, 32)) as Buffer;

    // const password = salt + '.' + hash.toString('hex');

    const user = await this.usersService.createUser({
      email,
      password,
      name: 'blah',
    });

    return user;
  }
}
