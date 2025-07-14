import { IHolidayRepository } from '../../Domain/Holiday/IHolidayRepository'
export class CreateHoliday {
  constructor(private repo: IHolidayRepository) {}
  execute(description: string, startDate: Date) {
    return this.repo.create(description, startDate)
  }
}
