import { ICostCenterRepository } from '../../Domain/CostCenter/ICostCenterRepository'

export class GetPaginatedCostCenters {
  constructor(private repo: ICostCenterRepository) {}

  async execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}