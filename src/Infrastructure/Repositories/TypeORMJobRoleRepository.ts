import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { JobRoleEntity } from '../Entities/JobRoleEntity'
import { JobRole } from '../../Domain/JobRole/JobRole'
import { IJobRoleRepository } from '../../Domain/JobRole/IJobRoleRepository'

export class TypeORMJobRoleRepository implements IJobRoleRepository {
  private repo: Repository<JobRoleEntity>

  constructor() {
    this.repo = AppDataSource.getRepository(JobRoleEntity)
  }

  private toDomain(entity: JobRoleEntity): JobRole {
    return new JobRole(entity.JobRoleID, entity.Description)
  }

  private toEntity(domain: JobRole): JobRoleEntity {
    const entity = new JobRoleEntity()
    entity.JobRoleID = domain.JobRoleID
    entity.Description = domain.Description
    return entity
  }

  async create(description: string): Promise<JobRole> {
    const entity = this.repo.create({ Description: description })
    const saved = await this.repo.save(entity)
    return this.toDomain(saved)
  }

  async getById(id: number): Promise<JobRole | null> {
    const entity = await this.repo.findOneBy({ JobRoleID: id })
    return entity ? this.toDomain(entity) : null
  }

  async update(id: number, description: string): Promise<JobRole | null> {
    const entity = await this.repo.findOneBy({ JobRoleID: id })
    if (!entity) return null
    entity.Description = description
    const updated = await this.repo.save(entity)
    return this.toDomain(updated)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<JobRole[]> {
    const entities = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    })
    return entities.map(this.toDomain)
  }
}