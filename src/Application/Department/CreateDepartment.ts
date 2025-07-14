import { IDepartmentRepository } from '../../Domain/Department/IDepartmentRepository'

export class CreateDepartment {
  constructor(private repo: IDepartmentRepository) {}

  async execute(description: string) {
    return this.repo.create(description)
  }
}
