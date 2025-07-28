import { IWorkPermitRepository } from '../../Domain/WorkPermit/IWorkPermitRepository'

export class DeleteWorkPermit {
  constructor(private repo: IWorkPermitRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}
