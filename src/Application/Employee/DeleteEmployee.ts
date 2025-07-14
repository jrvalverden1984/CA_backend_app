import { IEmployeeRepository } from '../../Domain/Employee/IEmployeeRepository'
export class DeleteEmployee {
  constructor(private repo: IEmployeeRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}