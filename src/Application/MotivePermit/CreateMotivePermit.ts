import { IMotivePermitRepository } from '../../Domain/MotivePermit/IMotivePermitRepository'
export class CreateMotivePermit {
  constructor(private repo: IMotivePermitRepository) {}
  execute(description: string) {
    return this.repo.create(description)
  }
}