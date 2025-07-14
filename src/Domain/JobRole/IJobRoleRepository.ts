import { JobRole } from './JobRole'

export interface IJobRoleRepository {
  create(description: string): Promise<JobRole>
  getById(id: number): Promise<JobRole | null>
  update(id: number, description: string): Promise<JobRole | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<JobRole[]>
}
