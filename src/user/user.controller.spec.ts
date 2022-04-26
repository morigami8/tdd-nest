import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockUserService = {
      findOne: jest.fn().mockResolvedValue({
        id: randomUUID(),
        name: 'Morgan',
        email: 'test@test.com',
      }),
      findByEmail: jest.fn().mockResolvedValue({
        id: randomUUID(),
        name: 'Morgan',
        email: 'morgan@test.com',
      }),
      createUser: jest.fn().mockResolvedValue({
        email: 'morgan@test.com',
        password: 'password123',
      }),

      deleteUser: jest.fn().mockResolvedValue({
        id: randomUUID(),
        name: 'Morgan',
        email: 'morgan@test.com',
      }),
      updateUser: jest.fn().mockImplementation((id, updates) => {
        const user = { id, name: 'Morgan', email: 'morgan@test.com' };
        return Promise.resolve({ ...user, ...updates });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneUser Tests', () => {
    it('should return found user by uuid', async () => {
      const id = randomUUID();
      const user = await controller.findOneUser(id);

      expect(user).toEqual({
        id: expect.any(String),
        name: 'Morgan',
        email: 'test@test.com',
      });
    });
  });

  describe('findAllUsers Tests', () => {
    it('should return user by email', async () => {
      const email = 'morgan@test.com';
      const user = await controller.findAllUsers(email);
      expect(user).toEqual({
        id: expect.any(String),
        email,
        name: 'Morgan',
      });
    });
  });

  describe('createUser Tests', () => {
    it('should return newly create user', async () => {
      const candidate = {
        password: 'password123',
        email: 'morgan@test.com',
      };

      const user = await controller.createUser(candidate);

      expect(user).toStrictEqual<CreateUserDto>({
        ...candidate,
      });
    });
  });

  describe('deleteUser Tests', () => {
    it('should return deleted user', async () => {
      let id = randomUUID();

      const deletedUser = await controller.deleteUser(id);
      expect(deletedUser).toEqual({
        id: expect.any(String),
        name: 'Morgan',
        email: 'morgan@test.com',
      });
    });

    it('should return an error, NotFoundException', async () => {
      mockUserService.deleteUser = jest
        .fn()
        .mockRejectedValue(new NotFoundException());

      let id = randomUUID();

      await expect(controller.deleteUser(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('UpdateUser Tests', () => {
    it('updates the users email and passsword', async () => {
      const id = randomUUID();
      const updates: UpdateUserDto = {
        email: 'test@test.com',
        password: 'pas123',
      };

      const user = await controller.updateUser(id, updates);
      expect(user).toEqual({
        id: expect.any(String),
        name: 'Morgan',
        email: 'test@test.com',
        password: 'pas123',
      });
    });
  });
});
