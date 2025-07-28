import { ICutRepository } from '../../Domain/Cut/ICutRepository'
import { Cut } from '../../Domain/Cut/Cut'

export class CreateCut {
  constructor(private repository: ICutRepository) {}

  async execute(
    description: string,
    startDate: Date,
    endDate: Date,
    isModifiable: boolean
  ): Promise<Cut> {
    return this.repository.create(description, startDate, endDate, isModifiable)
  }
}
