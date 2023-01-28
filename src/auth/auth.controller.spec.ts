import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { LoggerService } from '../infrastructure/logger/logger.service';
import { authUserStub } from './stubs/auth-user.stub';

jest.mock('./auth.service.ts');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: Partial<AuthService>;
  let mockUserRepository = {};
  let logger: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        LoggerService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    logger = module.get<LoggerService>(LoggerService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    let user: User;

    beforeEach(async () => {
      user = await authController.signUp({
        email: authUserStub().email,
        password: authUserStub().password,
      });
    });

    test('then it should call authService', () => {
      expect(authService.signUp).toBeCalledWith(
        authUserStub().email,
        authUserStub().password,
      );
    });

    test('then it should return a user', () => {
      expect(user).toEqual(authUserStub());
    });
  });
});
