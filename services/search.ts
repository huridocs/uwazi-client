const search = async (query?: string) => {
  //
  // Catching, expecting and handling errors
  //

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search`);
  return response.json();
};

export { search };
