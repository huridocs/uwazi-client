import { api } from 'api';
import { EntityPlaceholder } from 'domains/Entity';

interface SearchResults {
  rows: EntityPlaceholder[];
}

const search = async (domain: string): Promise<SearchResults> => {
  const resp = await api.get(domain, 'search');
  return resp;
};

export { search };
