import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { ScheduleEntity } from '../Entities/ScheduleEntity'
import { Schedule } from '../../Domain/Schedule/Schedule'
import { IScheduleRepository } from '../../Domain/Schedule/IScheduleRepository'

export class TypeORMScheduleRepository implements IScheduleRepository {
  private repo: Repository<ScheduleEntity> = AppDataSource.getRepository(ScheduleEntity)

  private toDomain(e: ScheduleEntity): Schedule {
    return new Schedule(
      e.ScheduleID, e.Description, e.ShortName, e.MinuteBeforeInput,
      e.MinuteAfterOutput, e.MinuteDelay, e.ShiftType, e.MinuteLunch,
      e.Start, e.RangeStartIn, e.RangeStartOut,
      e.End, e.RangeEndIn, e.RangeEndOut
    )
  }

  async create(data: Omit<Schedule, 'ScheduleID'>): Promise<Schedule> {
    const entity = this.repo.create(data)
    return this.toDomain(await this.repo.save(entity))
  }

  async getById(id: number): Promise<Schedule | null> {
    const e = await this.repo.findOneBy({ ScheduleID: id })
    return e ? this.toDomain(e) : null
  }

  async update(id: number, data: Omit<Schedule, 'ScheduleID'>): Promise<Schedule | null> {
    const e = await this.repo.findOneBy({ ScheduleID: id })
    if (!e) return null
    Object.assign(e, data)
    return this.toDomain(await this.repo.save(e))
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<Schedule[]> {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }
}
