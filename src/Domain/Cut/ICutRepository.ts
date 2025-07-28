import { Cut } from './Cut'

export interface ICutRepository {
  create(
    description: string,
    startDate: Date,
    endDate: Date,
    isModifiable: boolean
  ): Promise<Cut>

  getById(id: number): Promise<Cut | null>
  update(
    id: number,
    description: string,
    startDate: Date,
    endDate: Date,
    isModifiable: boolean
  ): Promise<Cut | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Cut[]>
}
