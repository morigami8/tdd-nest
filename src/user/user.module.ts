import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoggerModule } from '../infrastructure/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
