import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { CostCenterEntity } from '../Entities/CostCenterEntity'
import { CostCenter } from '../../Domain/CostCenter/CostCenter'
import { ICostCenterRepository } from '../../Domain/CostCenter/ICostCenterRepository'

export class TypeORMCostCenterRepository implements ICostCenterRepository {
  private repo: Repository<CostCenterEntity>

  constructor() {
    this.repo = AppDataSource.getRepository(CostCenterEntity)
  }

  private toDomain(entity: CostCenterEntity): CostCenter {
    return new CostCenter(entity.CostCenterID, entity.Description)
  }

  private toEntity(domain: CostCenter): CostCenterEntity {
    const entity = new CostCenterEntity()
    entity.CostCenterID = domain.CostCenterID
    entity.Description = domain.Description
    return entity
  }

  async create(description: string): Promise<CostCenter> {
    const entity = this.repo.create({ Description: description })
    const saved = await this.repo.save(entity)
    return this.toDomain(saved)
  }

  async getById(id: number): Promise<CostCenter | null> {
    const entity = await this.repo.findOneBy({ CostCenterID: id })
    return entity ? this.toDomain(entity) : null
  }

  async update(id: number, description: string): Promise<CostCenter | null> {
    const entity = await this.repo.findOneBy({ CostCenterID: id })
    if (!entity) return null
    entity.Description = description
    const updated = await this.repo.save(entity)
    return this.toDomain(updated)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<CostCenter[]> {
    const entities = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    })
    return entities.map(this.toDomain)
  }
}