import { api } from 'api';

export interface EntityPlaceholder {
  _id: string;
  title: string;
}
interface SearchResults {
  rows: EntityPlaceholder[];
}

const search = async (): Promise<SearchResults> => {
  const resp = await api.get('/search');
  return resp;
}

export { search };