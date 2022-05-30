const apiFetcher = async (path: string, options: 'text' | 'json' = 'json') => {
  const apiURL = `http://localhost:3001/api/${path}`;

  const request = fetch(apiURL);

  const response = await request;

  if (options === 'json') {
    return response.json();
  }

  if (options === 'text') {
    return response.text();
  }
};

export { apiFetcher };
