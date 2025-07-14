import { IShiftRepository } from '../../Domain/Shift/IShiftRepository'
import { Shift } from '../../Domain/Shift/Shift'
export class UpdateShift {
  constructor(private repo: IShiftRepository) {}
  execute(id: number, data: Omit<Shift, 'ShiftID'>) {
    return this.repo.update(id, data)
  }
}