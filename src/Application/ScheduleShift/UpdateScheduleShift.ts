import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'
export class UpdateScheduleShift {
  constructor(private repo: IScheduleShiftRepository) {}
  execute(id: number, scheduleID: number, shiftID: number) {
    return this.repo.update(id, scheduleID, shiftID)
  }
}