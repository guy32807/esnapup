import { NextApiRequest, NextApiResponse } from 'next';
import { specializations } from '@/domain/entities/specialization';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      return res.status(200).json({ specializations });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch specializations' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}