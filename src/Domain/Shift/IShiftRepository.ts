import { Shift } from './Shift'

export interface IShiftRepository {
  create(data: Omit<Shift, 'ShiftID'>): Promise<Shift>
  getById(id: number): Promise<Shift | null>
  update(id: number, data: Omit<Shift, 'ShiftID'>): Promise<Shift | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Shift[]>
}
