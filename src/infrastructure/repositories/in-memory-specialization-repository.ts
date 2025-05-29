import { SpecializationRepository } from '@/application/interfaces/specialization-repository';
import { Specialization, specializations } from '@/domain/entities/specialization';

export class InMemorySpecializationRepository implements SpecializationRepository {
  async getAll(): Promise<Specialization[]> {
    return specializations;
  }
  
  async getById(id: string): Promise<Specialization | null> {
    return specializations.find(s => s.id === id) || null;
  }
}