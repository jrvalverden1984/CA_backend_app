import { ICutRepository } from '../../Domain/Cut/ICutRepository'
import { Cut } from '../../Domain/Cut/Cut'

export class GetCutsPaginated {
  constructor(private repository: ICutRepository) {}

  async execute(page: number, limit: number): Promise<Cut[]> {
    return this.repository.getPaginated(page, limit)
  }
}
