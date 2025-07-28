import { IMotivePermitRepository } from '../../Domain/MotivePermit/IMotivePermitRepository'
export class DeleteMotivePermit {
  constructor(private repo: IMotivePermitRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}