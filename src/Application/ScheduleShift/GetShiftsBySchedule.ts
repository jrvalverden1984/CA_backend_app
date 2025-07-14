import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'

export class GetShiftsBySchedule {
  constructor(private repo: IScheduleShiftRepository) {}

  execute(scheduleID: number) {
    return this.repo.findBySchedule(scheduleID)
  }
}
