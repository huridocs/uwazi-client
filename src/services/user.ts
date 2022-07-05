type ServiceResponse = {
  data: unknown;
  error?: {
    code: string;
  };
};

const login = async (
  username: string,
  password: string,
  rembember: boolean
): Promise<ServiceResponse> => Promise.resolve({ data: { username, password, rembember } });

const recoverPassword = async (email: string): Promise<ServiceResponse> =>
  Promise.resolve({ data: true });

export type { ServiceResponse };
export { login, recoverPassword };
