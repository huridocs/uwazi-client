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
  post: async (url: string, data: any) => {
    const apiURL = `http://localhost:3000/api/${url}`;
    const headers = new Headers();
    const body = JSON.stringify(data);
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('content-type', 'application/json');
    headers.append('content-length', body.length.toString());
    const resp = await fetch(apiURL, {
      method: 'POST',
      headers,
      credentials: 'include',
      body,
      mode: 'cors',
    });
    return resp.json();
  },
};

export { api };
