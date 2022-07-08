import { api } from 'api';

type ServiceResponse = {
  data: unknown;
  error?: {
    code: string;
  };
};

const login = async (username: string, password: string): Promise<ServiceResponse> => {
  const resp = await api.post('login', { username, password });
  if (resp.error) {
    return Promise.resolve({ data: {}, error: { code: '401' } });
  }
  return Promise.resolve({ data: resp });
};

const recoverPassword = async (_email: string): Promise<ServiceResponse> =>
  Promise.resolve({ data: true });

export type { ServiceResponse };
export { login, recoverPassword };
