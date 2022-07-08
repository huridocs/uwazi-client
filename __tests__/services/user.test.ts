import { api } from 'api';
import { login } from 'services/user';

describe('User', () => {
  describe('login', () => {
    it('should return a user object for successfull login', async () => {
      const apiPostSpy = jest.spyOn(api, 'post');
      apiPostSpy.mockResolvedValue({ username: 'username' });
      const user = await login('username', 'password');
      expect(user).toEqual({ data: { username: 'username' } });
    });

    it('should return an error for failed login', async () => {
      const apiPostSpy = jest.spyOn(api, 'post');
      apiPostSpy.mockResolvedValue({ error: 'Invalid username or password' });
      const user = await login('username', 'password');
      expect(user).toEqual({ data: {}, error: { code: '401' } });
    });
  });
});
