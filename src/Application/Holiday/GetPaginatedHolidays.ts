import { IHolidayRepository } from '../../Domain/Holiday/IHolidayRepository'
export class GetPaginatedHolidays {
  constructor(private repo: IHolidayRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}
