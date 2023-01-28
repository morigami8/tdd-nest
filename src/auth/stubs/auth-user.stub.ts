import { User } from '../../user/user.entity';

export const authUserStub = (): User => {
  return {
    id: '123',
    name: 'Morgan Test',
    email: 'test@example.com',
    password: 'password123',
  };
};
