import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'
export class DeleteScheduleShift {
  constructor(private repo: IScheduleShiftRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}