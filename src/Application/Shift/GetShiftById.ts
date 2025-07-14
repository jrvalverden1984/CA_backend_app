import { IShiftRepository } from '../../Domain/Shift/IShiftRepository'
export class GetShiftById {
  constructor(private repo: IShiftRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}