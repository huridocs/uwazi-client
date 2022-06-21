import getConfig from 'next/config';

const api = {
  get: async (domain: string, url: string) => {
    const { publicRuntimeConfig } = getConfig();
    const protocol = publicRuntimeConfig.NODE_ENV === 'production' ? 'https' : 'http';
    const apiURL = new URL(`${protocol}://${domain}`);
    apiURL.port = publicRuntimeConfig.NODE_ENV === 'production' ? apiURL.port : '3000';
    const resp = await fetch(`${apiURL.toString()}api/${url}`, {
      method: 'GET',
    });
    return resp.json();
  },
};

export { api };
