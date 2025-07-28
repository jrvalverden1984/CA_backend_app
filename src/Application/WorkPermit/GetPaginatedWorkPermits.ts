import { IWorkPermitRepository } from '../../Domain/WorkPermit/IWorkPermitRepository'

export class GetPaginatedWorkPermits {
  constructor(private repo: IWorkPermitRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}