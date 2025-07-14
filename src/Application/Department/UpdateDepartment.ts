import { IDepartmentRepository } from '../../Domain/Department/IDepartmentRepository'

export class UpdateDepartment {
  constructor(private repo: IDepartmentRepository) {}

  async execute(id: number, description: string) {
    return this.repo.update(id, description)
  }
}