import { Schedule } from './Schedule'

export interface IScheduleRepository {
  create(data: Omit<Schedule, 'ScheduleID'>): Promise<Schedule>
  getById(id: number): Promise<Schedule | null>
  update(id: number, data: Omit<Schedule, 'ScheduleID'>): Promise<Schedule | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Schedule[]>
}
