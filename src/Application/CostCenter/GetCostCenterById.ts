import { ICostCenterRepository } from '../../Domain/CostCenter/ICostCenterRepository'

export class GetCostCenterById {
  constructor(private repo: ICostCenterRepository) {}

  async execute(id: number) {
    return this.repo.getById(id)
  }
}