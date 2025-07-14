import { IHolidayRepository } from '../../Domain/Holiday/IHolidayRepository'
export class UpdateHoliday {
  constructor(private repo: IHolidayRepository) {}
  execute(id: number, description: string, startDate: Date) {
    return this.repo.update(id, description, startDate)
  }
}