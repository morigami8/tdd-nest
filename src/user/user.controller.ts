import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    return user;
  }

  @Get('')
  async findAllUsers(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);

    return user;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = this.usersService.createUser(body);

    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(id);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.updateUser(id, body);

    return user;
  }
}
