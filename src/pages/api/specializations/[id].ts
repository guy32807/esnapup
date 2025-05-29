// src/pages/api/specializations/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { InMemorySpecializationRepository } from '@/infrastructure/repositories/in-memory-specialization-repository';
import { SpecializationService } from '@/application/services/specialization-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    
    const repository = new InMemorySpecializationRepository();
    const service = new SpecializationService(repository);
    
    const specialization = await service.getSpecializationById(id as string);
    
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    
    return res.status(200).json(specialization);
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}