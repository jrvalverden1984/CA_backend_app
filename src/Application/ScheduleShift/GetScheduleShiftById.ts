import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'
export class GetScheduleShiftById {
  constructor(private repo: IScheduleShiftRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}