import { IShiftRepository } from '../../Domain/Shift/IShiftRepository'
export class DeleteShift {
  constructor(private repo: IShiftRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}