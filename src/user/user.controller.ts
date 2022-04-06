import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    return user;
  }

  @Get()
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

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updates: Partial<CreateUserDto>,
  ) {
    const user = await this.usersService.updateUser(id, updates);

    return user;
  }
}
