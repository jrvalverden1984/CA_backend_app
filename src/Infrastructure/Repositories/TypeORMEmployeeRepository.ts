import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { EmployeeEntity } from '../Entities/EmployeeEntity'
import { Employee } from '../../Domain/Employee/Employee'
import { IEmployeeRepository } from '../../Domain/Employee/IEmployeeRepository'

export class TypeORMEmployeeRepository implements IEmployeeRepository {
  private repo: Repository<EmployeeEntity> = AppDataSource.getRepository(EmployeeEntity)

  private toDomain(e: EmployeeEntity): Employee {
    return new Employee(
      e.EmployeeID, e.IdentificationNumber, e.FirstName, e.LastName,
      e.DepartmentID, e.JobRoleID, e.CostCenterID, e.ScheduleID,
      e.HireDate, e.Overtime, Number(e.Salary), e.IsActive, e.Photo
    )
  }

  async create(data: Omit<Employee, 'EmployeeID'>) {
    const saved = await this.repo.save(this.repo.create(data))
    return this.toDomain(saved)
  }

  async getById(id: number) {
    const e = await this.repo.findOneBy({ EmployeeID: id })
    return e ? this.toDomain(e) : null
  }

  async update(id: number, data: Omit<Employee, 'EmployeeID'>) {
    const e = await this.repo.findOneBy({ EmployeeID: id })
    if (!e) return null
    Object.assign(e, data)
    return this.toDomain(await this.repo.save(e))
  }

  async delete(id: number) {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number) {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }
}
