import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'

export class AssignShiftsToSchedule {
  constructor(private repo: IScheduleShiftRepository) {}

  execute(scheduleID: number, shiftIDs: number[]) {
    // shiftIDs: lista de IDs de Shift que se deben asociar
    return this.repo.upsertManyForSchedule(scheduleID, shiftIDs)
  }
}
