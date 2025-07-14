import { IDepartmentRepository } from '../../Domain/Department/IDepartmentRepository'

export class GetDepartmentById {
  constructor(private repo: IDepartmentRepository) {}

  async execute(id: number) {
    return this.repo.getById(id)
  }
}