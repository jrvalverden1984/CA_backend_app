import { AppDataSource } from '../Database/data-source'
import { Repository } from 'typeorm'
import { WorkPermitEntity } from '../Entities/WorkPermitEntity'
import { WorkPermit } from '../../Domain/WorkPermit/WorkPermit'
import { IWorkPermitRepository } from '../../Domain/WorkPermit/IWorkPermitRepository'

export class TypeORMWorkPermitRepository implements IWorkPermitRepository {
  private repo: Repository<WorkPermitEntity> = AppDataSource.getRepository(WorkPermitEntity)

  async create(data: Omit<WorkPermit, 'WorkPermitID'>): Promise<WorkPermit> {
    const entity = this.repo.create(data)
    const saved = await this.repo.save(entity)
    return this.toDomain(saved)
  }

  async getById(id: number): Promise<WorkPermit | null> {
    const found = await this.repo.findOneBy({ WorkPermitID: id })
    return found ? this.toDomain(found) : null
  }

  async update(id: number, data: Omit<WorkPermit, 'WorkPermitID'>): Promise<WorkPermit | null> {
    await this.repo.update(id, data)
    return this.getById(id)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<WorkPermit[]> {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }

  private toDomain(entity: WorkPermitEntity): WorkPermit {
    return new WorkPermit(
      entity.WorkPermitID,
      entity.Description,
      entity.EmployeeID,
      entity.MotivePermitID,
      entity.StartDate,
      entity.EndDate
    )
  }
}
