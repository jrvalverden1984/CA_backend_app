import { WorkPermit } from './WorkPermit'

export interface IWorkPermitRepository {
  create(data: Omit<WorkPermit, 'WorkPermitID'>): Promise<WorkPermit>
  getById(id: number): Promise<WorkPermit | null>
  update(id: number, data: Omit<WorkPermit, 'WorkPermitID'>): Promise<WorkPermit | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<WorkPermit[]>
}
