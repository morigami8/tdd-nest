import { Injectable, BadRequestException } from '@nestjs/common';
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

  async signUserIn(email: string, pass: string) {
    //find user by email from users service
    //if user exists - get hashed value from response
    //bcrypt compare the password given and the response password
    //return user if success

    const [user] = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Incorrect username or password');
    }

    let compareResult = await bcrypt.compare(pass, user.password);
    if (!compareResult) {
      throw new BadRequestException('Incorrect username or password');
    }

    return user;
  }
}
