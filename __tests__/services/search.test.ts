import { api } from 'api';
import { search } from 'services/search';
import { backendFixtures } from '../commonFixtures/backendFixtures';
import { entities } from '../commonFixtures/entities';

describe('search', () => {
  beforeEach(() => {
    const apiGetSpy = jest.spyOn(api, 'get');
    apiGetSpy.mockImplementation(async url => {
      switch (url) {
        case 'search':
          return { rows: backendFixtures.entities };
        case 'templates':
          return { rows: backendFixtures.templates };
      }
    });
  });

  it('should fetch and parse the search endpoint', async () => {
    const results = await search();
    expect(results).toEqual({ rows: entities });
  });
});
