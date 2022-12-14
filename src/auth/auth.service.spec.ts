import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AppModule } from '../app.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UserService>;

  mockUsersService = {
    createUser: jest
      .fn()
      .mockImplementation((email, pass) => Promise.resolve({ email, pass })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AppModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '120s' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should salt password', async () => {
    const pass = 'password123';

    const user = await service.signUp('test@test', pass);

    expect(user).toBe({ email: 'test@test', pass });
  });
});
