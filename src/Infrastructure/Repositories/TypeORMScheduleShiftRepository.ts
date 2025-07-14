import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { ScheduleShiftEntity } from '../Entities/ScheduleShiftEntity'
import { ScheduleShift } from '../../Domain/ScheduleShift/ScheduleShift'
import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'

export class TypeORMScheduleShiftRepository implements IScheduleShiftRepository {
  private repo: Repository<ScheduleShiftEntity> = AppDataSource.getRepository(ScheduleShiftEntity)

  private toDomain(e: ScheduleShiftEntity): ScheduleShift {
    return new ScheduleShift(e.ScheduleShiftID, e.ScheduleID, e.ShiftID)
  }

  async create(scheduleID: number, shiftID: number) {
    const entity = this.repo.create({ ScheduleID: scheduleID, ShiftID: shiftID })
    return this.toDomain(await this.repo.save(entity))
  }

  async getById(id: number) {
    const e = await this.repo.findOneBy({ ScheduleShiftID: id })
    return e ? this.toDomain(e) : null
  }

  async update(id: number, scheduleID: number, shiftID: number) {
    const e = await this.repo.findOneBy({ ScheduleShiftID: id })
    if (!e) return null
    e.ScheduleID = scheduleID
    e.ShiftID = shiftID
    return this.toDomain(await this.repo.save(e))
  }

  async delete(id: number) {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number) {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }

   async upsertManyForSchedule(scheduleID: number, shiftIDs: number[]) {
    // 1) Traer existentes con ese ScheduleID
    const existing = await this.repo.find({ where: { ScheduleID: scheduleID } })

    // Calcular cuáles ya existen y cuáles son nuevos
    const existingShiftIDs = new Set(existing.map(e => e.ShiftID))
    const toAdd = shiftIDs.filter(id => !existingShiftIDs.has(id))
    const toKeep = existing.filter(e => shiftIDs.includes(e.ShiftID))

    // 2) Borrar los que sobran
    const toDelete = existing.filter(e => !shiftIDs.includes(e.ShiftID))
    if (toDelete.length) {
      await this.repo.remove(toDelete)
    }

    // 3) Insertar los nuevos
    const newEntities = toAdd.map(id => this.repo.create({ ScheduleID: scheduleID, ShiftID: id }))
    const saved = await this.repo.save(newEntities)

    return [...toKeep, ...saved].map(this.toDomain.bind(this))
  }

  async findBySchedule(scheduleID: number) {
    const list = await this.repo.find({ where: { ScheduleID: scheduleID } })
    return list.map(this.toDomain)
  }
}
