import type { NextApiRequest, NextApiResponse } from 'next';
import { search } from '../../services/search';

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await search();
  res.status(200).json(response);
};

export default handler;
