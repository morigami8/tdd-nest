import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AppModule } from '../app.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { authUserStub } from './stubs/auth-user.stub';
import { CreateUserDto } from '../user/dtos/createUser.dto';

jest.mock('../user/user.service.ts');
describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UserService>;
  let mockJwtService = {};
  let user: User = {
    ...authUserStub(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [
      //   UserModule,
      //   AppModule,
      //   JwtModule.register({
      //     secret: process.env.JWT_SECRET,
      //     signOptions: { expiresIn: '120s' },
      //   }),
      // ],
      providers: [
        AuthService,
        UserService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UserService>(UserService);

    //jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('SignUp', () => {
    it('should call mockUserService Create User', async () => {
      const spiedSalt = jest
        .spyOn(bcrypt, 'genSalt')
        .mockImplementation(() => '');
      const spiedHash = jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve(user.password));

      const createdUser = await service.signUp(user.email, user.password);

      expect(spiedSalt).toHaveBeenCalled();
      expect(spiedHash).toHaveBeenCalled();
      expect(usersService.createUser).toHaveBeenCalledWith({
        email: user.email,
        password: user.password,
      });
      expect(createdUser).toStrictEqual({
        email: user.email,
        password: user.password,
      });
    });
  });

  describe('SignIn', () => {
    it('should validate user successfully', async () => {
      const spiedSuccessCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => true);

      let validatedUser = await service.validateUser(user.email, user.password);

      expect(spiedSuccessCompare).toHaveBeenCalled();
      let { password, ...userNoPassword } = user;
      expect(validatedUser).toStrictEqual(userNoPassword);
    });

    it('should reject validing user - wrong password', async () => {
      const spiedFailureCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => false);
      try {
        await service.validateUser(user.email, user.password);
      } catch (e) {
        expect(spiedFailureCompare).toHaveBeenCalled();
        expect(e.status).toEqual(400);
        expect(e.name).toEqual('BadRequestException');
      }
    });

    //TODO: Not hitting line 43 because cant change user
    //Cant mock implementations in the file?
    it('should reject validating user - user not found', async () => {
      try {
        await service.validateUser(null, null);
      } catch (e) {
        expect(e.status).toEqual(400);
        expect(e.name).toEqual('BadRequestException');
      }
    });
  });
});
