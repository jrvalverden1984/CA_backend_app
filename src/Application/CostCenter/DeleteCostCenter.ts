import { ICostCenterRepository } from '../../Domain/CostCenter/ICostCenterRepository'

export class DeleteCostCenter {
  constructor(private repo: ICostCenterRepository) {}

  async execute(id: number) {
    return this.repo.delete(id)
  }
}