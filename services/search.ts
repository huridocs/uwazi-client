import { api } from 'api';
import { EntityPlaceholder } from 'domains/Entity';

interface SearchResults {
  rows: EntityPlaceholder[];
}

const search = async (): Promise<SearchResults> => {
  const resp = await api.get('/search');
  return resp;
};

export { search };
