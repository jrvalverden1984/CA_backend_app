import { IEmployeeRepository } from '../../Domain/Employee/IEmployeeRepository'
import { Employee } from '../../Domain/Employee/Employee'
export class CreateEmployee {
  constructor(private repo: IEmployeeRepository) {}
  execute(data: Omit<Employee, 'EmployeeID'>) {
    return this.repo.create(data)
  }
}