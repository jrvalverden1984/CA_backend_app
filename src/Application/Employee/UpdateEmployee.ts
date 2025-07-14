import { IEmployeeRepository } from '../../Domain/Employee/IEmployeeRepository'
import { Employee } from '../../Domain/Employee/Employee'
export class UpdateEmployee {
  constructor(private repo: IEmployeeRepository) {}
  execute(id: number, data: Omit<Employee, 'EmployeeID'>) {
    return this.repo.update(id, data)
  }
}