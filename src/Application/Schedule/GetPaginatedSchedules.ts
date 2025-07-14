import { IScheduleRepository } from '../../Domain/Schedule/IScheduleRepository'
export class GetPaginatedSchedules {
  constructor(private repo: IScheduleRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}