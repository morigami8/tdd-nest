import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AppModule } from '../app.module';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule],
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
});
