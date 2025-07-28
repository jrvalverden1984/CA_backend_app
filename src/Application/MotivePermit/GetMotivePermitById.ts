import { IMotivePermitRepository } from '../../Domain/MotivePermit/IMotivePermitRepository'
export class GetMotivePermitById {
  constructor(private repo: IMotivePermitRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}