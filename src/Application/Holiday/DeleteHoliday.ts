import { IHolidayRepository } from '../../Domain/Holiday/IHolidayRepository'
export class DeleteHoliday {
  constructor(private repo: IHolidayRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}
