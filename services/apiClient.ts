const get = async (endpoint: string) => {
  //
  // Catching, expecting and handling errors
  //

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`);
  return response.json();
};

export { get };
