import { ICutRepository } from '../../Domain/Cut/ICutRepository'
import { Cut } from '../../Domain/Cut/Cut'

export class GetCutById {
  constructor(private repository: ICutRepository) {}

  async execute(id: number): Promise<Cut | null> {
    return this.repository.getById(id)
  }
}
