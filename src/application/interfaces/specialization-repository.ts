import { Specialization } from '@/domain/entities/specialization';

export interface SpecializationRepository {
  getAll(): Promise<Specialization[]>;
  getById(id: string): Promise<Specialization | null>;
}