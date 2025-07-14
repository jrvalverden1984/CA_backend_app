import { IJobRoleRepository } from '../../Domain/JobRole/IJobRoleRepository'

export class UpdateJobRole {
  constructor(private repo: IJobRoleRepository) {}

  async execute(id: number, description: string) {
    return this.repo.update(id, description)
  }
}