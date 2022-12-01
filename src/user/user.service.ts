import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { LoggerService } from '../infrastructure/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private loggerService: LoggerService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //this.userRepository.create(createUserDto);
    //TODO Find if user exists
    const candidate = await this.findByEmail(createUserDto.email);

    if (candidate.length) {
      throw new BadRequestException('email already exists!');
    }

    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await createQueryBuilder(User, 'user')
      .select('user')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    return user;
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({ email });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('No User exists!');
    }

    return this.userRepository.remove(user);
  }

  async updateUser(id: string, updates: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(user, updates);
    return this.userRepository.save(user);
  }
}
