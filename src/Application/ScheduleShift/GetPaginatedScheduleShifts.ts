import { IScheduleShiftRepository } from '../../Domain/ScheduleShift/IScheduleShiftRepository'
export class GetPaginatedScheduleShifts {
  constructor(private repo: IScheduleShiftRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}