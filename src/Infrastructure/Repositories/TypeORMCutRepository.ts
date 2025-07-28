import { AppDataSource } from '../Database/data-source'
import { CutEntity } from '../Entities/CutEntity'
import { Repository } from 'typeorm'
import { Cut } from '../../Domain/Cut/Cut'
import { ICutRepository } from '../../Domain/Cut/ICutRepository'

export class TypeORMCutRepository implements ICutRepository {
  private repo: Repository<CutEntity>

  constructor() {
    this.repo = AppDataSource.getRepository(CutEntity)
  }

  async create(
    description: string,
    startDate: Date,
    endDate: Date,
    isModifiable: boolean
  ): Promise<Cut> {
    const entity = this.repo.create({
      Description: description,
      StartDate: startDate,
      EndDate: endDate,
      IsModifiable: isModifiable
    })

    const saved = await this.repo.save(entity)
    return this.toDomain(saved)
  }

  async getById(id: number): Promise<Cut | null> {
    const found = await this.repo.findOneBy({ CutID: id })
    return found ? this.toDomain(found) : null
  }

  async update(
    id: number,
    description: string,
    startDate: Date,
    endDate: Date,
    isModifiable: boolean
  ): Promise<Cut | null> {
    await this.repo.update(id, {
      Description: description,
      StartDate: startDate,
      EndDate: endDate,
      IsModifiable: isModifiable
    })
    return this.getById(id)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<Cut[]> {
    const result = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit
    })
    return result.map(this.toDomain)
  }

  private toDomain(entity: CutEntity): Cut {
    return new Cut(
      entity.CutID,
      entity.Description,
      entity.StartDate,
      entity.EndDate,
      entity.IsModifiable
    )
  }
}
