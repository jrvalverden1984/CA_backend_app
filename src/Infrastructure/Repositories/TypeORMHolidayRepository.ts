import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { HolidayEntity } from '../Entities/HolidayEntity'
import { Holiday } from '../../Domain/Holiday/Holiday'
import { IHolidayRepository } from '../../Domain/Holiday/IHolidayRepository'

export class TypeORMHolidayRepository implements IHolidayRepository {
  private repo: Repository<HolidayEntity> = AppDataSource.getRepository(HolidayEntity)

  private toDomain(e: HolidayEntity): Holiday {
    return new Holiday(e.HolidayID, e.Description, e.StartDate)
  }

  async create(description: string, startDate: Date) {
    const entity = this.repo.create({ Description: description, StartDate: startDate })
    return this.toDomain(await this.repo.save(entity))
  }

  async getById(id: number) {
    const entity = await this.repo.findOneBy({ HolidayID: id })
    return entity ? this.toDomain(entity) : null
  }

  async update(id: number, description: string, startDate: Date) {
    const entity = await this.repo.findOneBy({ HolidayID: id })
    if (!entity) return null
    entity.Description = description
    entity.StartDate = startDate
    return this.toDomain(await this.repo.save(entity))
  }

  async delete(id: number) {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number) {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }
}
