import { IMotivePermitRepository } from '../../Domain/MotivePermit/IMotivePermitRepository'
export class GetPaginatedMotivePermits {
  constructor(private repo: IMotivePermitRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}