import { api } from 'api';

const search = async () => {
  const resp = await api.get('/search');
  return resp;
}

export { search };