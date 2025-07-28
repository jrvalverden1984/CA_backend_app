import { ICutRepository } from '../../Domain/Cut/ICutRepository'

export class DeleteCut {
  constructor(private repository: ICutRepository) {}

  async execute(id: number): Promise<void> {
    return this.repository.delete(id)
  }
}
