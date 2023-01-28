import { authUserStub } from '../stubs/auth-user.stub';

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue(authUserStub()),
  validateUser: jest.fn().mockResolvedValue(authUserStub()),
  signUserIn: jest.fn().mockReturnValue('HDSLAHDJSHL'),
});
