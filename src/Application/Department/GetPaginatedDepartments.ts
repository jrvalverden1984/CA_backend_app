import { IDepartmentRepository } from '../../Domain/Department/IDepartmentRepository'

export class GetPaginatedDepartments {
  constructor(private repo: IDepartmentRepository) {}

  async execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}