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
      api.get('/search');
      expect(global.fetch).toHaveBeenCalledWith('/api/search', {
        method: 'GET',
      });
    });
  });

  describe('development enviroment', () => {
    it('should append the port', () => {
      api.get('/search');
      expect(global.fetch).toHaveBeenCalledWith(':3000/api/search', {
        method: 'GET',
      });
    });
  });
});
