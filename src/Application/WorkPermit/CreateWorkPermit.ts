import { IWorkPermitRepository } from '../../Domain/WorkPermit/IWorkPermitRepository'
import { WorkPermit } from '../../Domain/WorkPermit/WorkPermit'

export class CreateWorkPermit {
  constructor(private repo: IWorkPermitRepository) {}
  execute(data: Omit<WorkPermit, 'WorkPermitID'>) {
    return this.repo.create(data)
  }
}