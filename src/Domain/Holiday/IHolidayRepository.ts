import { Holiday } from './Holiday'

export interface IHolidayRepository {
  create(description: string, startDate: Date): Promise<Holiday>
  getById(id: number): Promise<Holiday | null>
  update(id: number, description: string, startDate: Date): Promise<Holiday | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Holiday[]>
}
