import { CostCenter } from './CostCenter'

export interface ICostCenterRepository {
  create(description: string): Promise<CostCenter>
  getById(id: number): Promise<CostCenter | null>
  update(id: number, description: string): Promise<CostCenter | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<CostCenter[]>
}
