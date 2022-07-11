import * as config from 'next/config';
import { api } from 'api';

describe('api', () => {
  const unmockedFetch = global.fetch;

  const configSpy = (env: string, host: string) => {
    jest.spyOn(config, 'default').mockReturnValue({
      publicRuntimeConfig: { NODE_ENV: env, API_HOST: host },
    });
  };

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
      configSpy('production', 'localhost:8080');

      api.get('search');

      expect(global.fetch).toHaveBeenCalledWith('https://localhost:8080/api/search', {
        method: 'GET',
      });
    });
  });

  describe('development enviroment', () => {
    it('should append the port', () => {
      configSpy('development', 'localhost');

      api.get('search');

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/search', {
        method: 'GET',
      });
    });
  });
});
