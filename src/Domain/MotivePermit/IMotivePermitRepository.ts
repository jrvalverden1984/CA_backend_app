import { MotivePermit } from './MotivePermit'

export interface IMotivePermitRepository {
  create(description: string): Promise<MotivePermit>
  getById(id: number): Promise<MotivePermit | null>
  update(id: number, description: string): Promise<MotivePermit | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<MotivePermit[]>
}
