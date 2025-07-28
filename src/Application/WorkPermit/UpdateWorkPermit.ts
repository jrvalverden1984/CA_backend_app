import { IWorkPermitRepository } from '../../Domain/WorkPermit/IWorkPermitRepository'
import { WorkPermit } from '../../Domain/WorkPermit/WorkPermit'

export class UpdateWorkPermit {
  constructor(private repo: IWorkPermitRepository) {}
  execute(id: number, data: Omit<WorkPermit, 'WorkPermitID'>) {
    return this.repo.update(id, data)
  }
}