import { IDepartmentRepository } from '../../Domain/Department/IDepartmentRepository'

export class DeleteDepartment {
  constructor(private repo: IDepartmentRepository) {}

  async execute(id: number) {
    return this.repo.delete(id)
  }
}