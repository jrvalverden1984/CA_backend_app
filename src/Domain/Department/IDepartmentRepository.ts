import { Department } from './Department'

export interface IDepartmentRepository {
  create(description: string): Promise<Department>
  getById(id: number): Promise<Department | null>
  update(id: number, description: string): Promise<Department | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Department[]>
}
