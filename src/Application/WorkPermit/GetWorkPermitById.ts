import { IWorkPermitRepository } from '../../Domain/WorkPermit/IWorkPermitRepository'

export class GetWorkPermitById {
  constructor(private repo: IWorkPermitRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}