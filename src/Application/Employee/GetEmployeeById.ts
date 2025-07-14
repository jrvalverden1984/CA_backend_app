import { IEmployeeRepository } from '../../Domain/Employee/IEmployeeRepository'
export class GetEmployeeById {
  constructor(private repo: IEmployeeRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}