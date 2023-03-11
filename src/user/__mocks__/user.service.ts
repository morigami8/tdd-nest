import { authUserStub } from '../../auth/stubs/auth-user.stub';

console.log('made it to mock file');
export const UserService = jest.fn().mockReturnValue({
  //Default null after two test calls
  createUser: jest
    .fn()
    .mockResolvedValueOnce({
      email: 'test@example.com',
      password: 'password123',
    })
    .mockResolvedValueOnce({
      email: 'test@example.com',
      password: 'password123',
    })
    .mockResolvedValueOnce(null),
  findByEmail: jest.fn().mockResolvedValue([
    {
      password: authUserStub().password,
      ...authUserStub(),
    },
  ]),
});
