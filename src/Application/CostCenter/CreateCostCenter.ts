import { ICostCenterRepository } from '../../Domain/CostCenter/ICostCenterRepository'

export class CreateCostCenter {
  constructor(private repo: ICostCenterRepository) {}

  async execute(description: string) {
    return this.repo.create(description)
  }
}