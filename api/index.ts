const BASE_UWAZI_API = 'http://localhost:3000/api';

const api = {
  get: async (url: string) => {
    const resp = await fetch(`${BASE_UWAZI_API}${url}`, {
      method: 'GET'
    });
    return resp.json();
  },
};

export { api };