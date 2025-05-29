import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ 
    name: 'API is working correctly', 
    timestamp: new Date().toISOString() 
  });
}