import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'
export class CreateScheduleShift {
  constructor(private repo: IScheduleShiftRepository) {}
  execute(scheduleID: number, shiftID: number) {
    return this.repo.create(scheduleID, shiftID)
  }
}