import { IEmployeeRepository } from '../../Domain/Employee/IEmployeeRepository'
export class GetPaginatedEmployees {
  constructor(private repo: IEmployeeRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}