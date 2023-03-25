import { authUserStub } from '../../auth/stubs/auth-user.stub';

console.log('made it to mock file');
export const UserService = jest.fn().mockReturnValue({
  //Default null after two test calls
  createUser: jest.fn().mockResolvedValue({
    email: 'test@example.com',
    password: 'password123',
  }),
  findByEmail: jest
    .fn()
    .mockResolvedValueOnce([
      {
        password: authUserStub().password,
        ...authUserStub(),
      },
    ])
    .mockResolvedValueOnce([
      {
        password: authUserStub().password,
        ...authUserStub(),
      },
    ])
    .mockReturnValueOnce([]),
});
