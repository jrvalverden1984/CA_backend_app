import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { DepartmentEntity } from '../Entities/DepartmentEntity'
import { Department } from '../../Domain/Department/Department'
import { IDepartmentRepository } from '../../Domain/Department/IDepartmentRepository'

export class TypeORMDepartmentRepository implements IDepartmentRepository {
  private repo: Repository<DepartmentEntity>

  constructor() {
    this.repo = AppDataSource.getRepository(DepartmentEntity)
  }

  private toDomain(entity: DepartmentEntity): Department {
    return new Department(entity.DepartmentID, entity.Description)
  }

  private toEntity(domain: Department): DepartmentEntity {
    const entity = new DepartmentEntity()
    entity.DepartmentID = domain.DepartmentID
    entity.Description = domain.Description
    return entity
  }

  async create(description: string): Promise<Department> {
    const entity = this.repo.create({ Description: description })
    const saved = await this.repo.save(entity)
    return this.toDomain(saved)
  }

  async getById(id: number): Promise<Department | null> {
    const entity = await this.repo.findOneBy({ DepartmentID: id })
    return entity ? this.toDomain(entity) : null
  }

  async update(id: number, description: string): Promise<Department | null> {
    const entity = await this.repo.findOneBy({ DepartmentID: id })
    if (!entity) return null
    entity.Description = description
    const updated = await this.repo.save(entity)
    return this.toDomain(updated)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<Department[]> {
    const entities = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    })
    return entities.map(this.toDomain)
  }
}
