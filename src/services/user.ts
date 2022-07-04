type ServiceResponse = {
  data: unknown;
  error?: {
    code: string;
  };
};

const login = async (username: string, password: string): Promise<ServiceResponse> =>
  Promise.resolve({ data: { username, password } });

export type { ServiceResponse };
export { login };
