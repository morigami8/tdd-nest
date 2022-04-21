import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt, randomBytes, createHash } from 'crypto';
import { promisify } from 'util';
import { UserService } from '../user/user.service';
promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UserService,
  ) {}

  signUp(email: string, pass: string) {
    const salt = randomBytes(128).toString('base64');

    const saltPassword = `${pass}.${salt}`;

    let hash = createHash('sha256');
    hash.update(saltPassword);

    let password = hash.digest().toString('hex');

    this.usersService.createUser({ email, password, name: 'blah' });
  }
}
