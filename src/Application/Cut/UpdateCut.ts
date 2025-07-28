import { ICutRepository } from '../../Domain/Cut/ICutRepository'
import { Cut } from '../../Domain/Cut/Cut'

export class UpdateCut {
  constructor(private repository: ICutRepository) {}

  async execute(
    id: number,
    description: string,
    startDate: Date,
    endDate: Date,
    isModifiable: boolean
  ): Promise<Cut | null> {
    return this.repository.update(id, description, startDate, endDate, isModifiable)
  }
}
