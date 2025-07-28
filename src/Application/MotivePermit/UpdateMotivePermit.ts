import { IMotivePermitRepository } from '../../Domain/MotivePermit/IMotivePermitRepository'
export class UpdateMotivePermit {
  constructor(private repo: IMotivePermitRepository) {}
  execute(id: number, description: string) {
    return this.repo.update(id, description)
  }
}