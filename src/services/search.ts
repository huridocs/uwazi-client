import { api } from 'api';
import { Entity } from 'domains/Entity';

interface SearchResults {
  rows: Entity[];
}

const search = async (domain: string): Promise<SearchResults> => {
  const resp = await api.get(domain, 'search');
  return resp;
};

export { search };
