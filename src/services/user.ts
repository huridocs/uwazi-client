type ServiceResponse = {
  data: unknown;
  error?: {
    code: string;
  };
};

const login = async (username: string, password: string, rembember:boolean): Promise<ServiceResponse> =>
  Promise.resolve({ data: { username, password, rembember } });

export type { ServiceResponse };
export { login };
