import { ScheduleShift } from './ScheduleShift'

export interface IScheduleShiftRepository {
  create(scheduleID: number, shiftID: number): Promise<ScheduleShift>
  getById(id: number): Promise<ScheduleShift | null>
  update(id: number, scheduleID: number, shiftID: number): Promise<ScheduleShift | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<ScheduleShift[]>
  upsertManyForSchedule(scheduleID: number, shiftIDs: number[]): Promise<ScheduleShift[]>   
  findBySchedule(scheduleID: number): Promise<ScheduleShift[]> 
}
