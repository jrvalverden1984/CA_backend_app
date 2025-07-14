import { IHolidayRepository } from '../../Domain/Holiday/IHolidayRepository'
export class GetHolidayById {
  constructor(private repo: IHolidayRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}
