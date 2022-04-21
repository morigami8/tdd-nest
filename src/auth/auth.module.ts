import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule.register({ secret: 'secret123' }), UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
