import { Specialization } from '@/domain/entities/specialization';
import { SpecializationRepository } from '@/application/interfaces/specialization-repository';

export class SpecializationService {
  constructor(private repository: SpecializationRepository) {}
  
  async getAllSpecializations(): Promise<Specialization[]> {
    return this.repository.getAll();
  }
  
  async getSpecializationById(id: string): Promise<Specialization | null> {
    return this.repository.getById(id);
  }
}