import { Employee } from './Employee'

export interface IEmployeeRepository {
  create(data: Omit<Employee, 'EmployeeID'>): Promise<Employee>
  getById(id: number): Promise<Employee | null>
  update(id: number, data: Omit<Employee, 'EmployeeID'>): Promise<Employee | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Employee[]>
}
