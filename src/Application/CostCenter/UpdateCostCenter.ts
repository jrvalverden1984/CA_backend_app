import { ICostCenterRepository } from '../../Domain/CostCenter/ICostCenterRepository'

export class UpdateCostCenter {
  constructor(private repo: ICostCenterRepository) {}

  async execute(id: number, description: string) {
    return this.repo.update(id, description)
  }
}