import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { LoggerService } from '../infrastructure/logger/logger.service';

describe('UserService', () => {
  let service: UserService;
  let logger: LoggerService;
  let mockUserRepository;

  //TODO: GET FULL COVERAGE OF User.Service
  beforeEach(async () => {
    mockUserRepository = {
      createUser: jest.fn().mockImplementation(async (dto) => {
        const candidate = await mockUserRepository.findByEmail(dto.email);
        if (candidate) {
          throw new BadRequestException('User already exists!');
        }
        return dto;
      }),
      save: jest
        .fn()
        .mockImplementation((user) => Promise.resolve({ id: '1', ...user })),

      findOne: jest
        .fn()
        .mockImplementation((id) =>
          Promise.resolve({ id, name: 'Morgan', email: 'test@test.com' }),
        ),
      findByEmail: jest
        .fn()
        .mockImplementation((email) => Promise.resolve([email])),

      deleteUser: jest
        .fn()
        .mockImplementation((id) =>
          Promise.resolve({ id, name: 'Morgan', email: 'delete@test.com' }),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        LoggerService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    logger = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser Tests', () => {
    it('should create a new user record and return that', async () => {
      mockUserRepository.findByEmail = jest
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      let dto: CreateUserDto = {
        email: 'test@test.com',
        password: 'asdf',
      };
      expect(await mockUserRepository.createUser(dto)).toEqual({
        email: 'test@test.com',
        password: 'asdf',
      });
    });

    it('should call createUser but return error, user already exists!', async () => {
      let dto = {
        email: 'test@test.com',
        password: 'asdf',
      };
      await expect(mockUserRepository.createUser(dto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('should call save', async () => {
      expect.assertions(1);
      const data = {
        id: 1,
        name: 'morgan',
        email: 'test@test.com',
        password: 'password123',
      };
      const user = await mockUserRepository.save(data);
      expect(user).toEqual(data);
    });
  });

  describe('findOne Tests', () => {
    it('should call findOne and return one user', async () => {
      expect.assertions(1);

      const id = 'fdsajfd-123asda-asdaf';
      //TODO: Change to service.findOne
      //Why is our coverage shitty
      const user = await mockUserRepository.findOne(id);

      expect(user).toBeDefined();
    });

    it('should call findOne and return NotFoundException', async () => {
      mockUserRepository.findOne = jest
        .fn()
        .mockImplementation(() => Promise.reject(new NotFoundException()));

      const id = 'fdsajfd-123asda-asdaf';

      await expect(mockUserRepository.findOne(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('findByEmail Test', () => {
    it('should call findByEmail and return that email', async () => {
      let email = 'morgan@test.com';
      let [user] = await mockUserRepository.findByEmail(email);

      expect(user).toBe('morgan@test.com');
    });
  });

  describe('deleteUser Test', () => {
    it('should delete and return the user', async () => {
      let user = await mockUserRepository.deleteUser('8');
      //let user = await service.deleteUser('8');

      expect(user).toEqual({
        id: '8',
        name: 'Morgan',
        email: 'delete@test.com',
      });
    });
  });

  describe('updateUser', () => {
    it('should update user and return that user', async () => {
      const user = await mockUserRepository.findOne('8');
      let updates = { email: 'new@email.com' } as Partial<User>;

      Object.assign(user, updates);

      expect(user).toEqual({ id: '8', name: 'Morgan', email: 'new@email.com' });
    });
  });
});
