import * as config from 'next/config';
import { api } from 'api';

describe('api', () => {
  const unmockedFetch = global.fetch;

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  describe('get', () => {
    it('should use the domain name', () => {
      jest
        .spyOn(config, 'default')
        .mockReturnValue({ publicRuntimeConfig: { NODE_ENV: 'production' } });
      api.get('localhost:8080', 'search');
      expect(global.fetch).toHaveBeenCalledWith('https://localhost:8080/api/search', {
        method: 'GET',
      });
    });
  });

  describe('development enviroment', () => {
    it('should append the port', () => {
      jest
        .spyOn(config, 'default')
        .mockReturnValue({ publicRuntimeConfig: { NODE_ENV: 'development' } });
      api.get('localhost', 'search');
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/search', {
        method: 'GET',
      });
    });
  });
});
