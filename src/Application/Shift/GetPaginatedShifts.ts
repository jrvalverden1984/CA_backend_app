import { IShiftRepository } from '../../Domain/Shift/IShiftRepository'
export class GetPaginatedShifts {
  constructor(private repo: IShiftRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}