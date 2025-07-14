import { IJobRoleRepository } from '../../Domain/JobRole/IJobRoleRepository'

export class GetJobRoleById {
  constructor(private repo: IJobRoleRepository) {}

  async execute(id: number) {
    return this.repo.getById(id)
  }
}