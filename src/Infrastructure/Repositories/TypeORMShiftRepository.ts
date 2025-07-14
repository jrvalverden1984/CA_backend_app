import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { ShiftEntity } from '../Entities/ShiftEntity'
import { Shift } from '../../Domain/Shift/Shift'
import { IShiftRepository } from '../../Domain/Shift/IShiftRepository'

export class TypeORMShiftRepository implements IShiftRepository {
  private repo: Repository<ShiftEntity> = AppDataSource.getRepository(ShiftEntity)

  private toDomain(e: ShiftEntity): Shift {
    return new Shift(
      e.ShiftID, e.Description, e.Start, e.RangeStartIn, e.RangeStartOut,
      e.End, e.RangeEndIn, e.RangeEndOut
    )
  }

  async create(data: Omit<Shift, 'ShiftID'>): Promise<Shift> {
    const entity = this.repo.create(data)
    return this.toDomain(await this.repo.save(entity))
  }

  async getById(id: number): Promise<Shift | null> {
    const e = await this.repo.findOneBy({ ShiftID: id })
    return e ? this.toDomain(e) : null
  }

  async update(id: number, data: Omit<Shift, 'ShiftID'>): Promise<Shift | null> {
    const e = await this.repo.findOneBy({ ShiftID: id })
    if (!e) return null
    Object.assign(e, data)
    return this.toDomain(await this.repo.save(e))
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<Shift[]> {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }
}
