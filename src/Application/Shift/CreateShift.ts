import { IShiftRepository } from '../../Domain/Shift/IShiftRepository'
import { Shift } from '../../Domain/Shift/Shift'
export class CreateShift {
  constructor(private repo: IShiftRepository) {}
  execute(data: Omit<Shift, 'ShiftID'>) {
    return this.repo.create(data)
  }
}