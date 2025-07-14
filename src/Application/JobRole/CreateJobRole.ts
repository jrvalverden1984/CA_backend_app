import { IJobRoleRepository } from '../../Domain/JobRole/IJobRoleRepository'

export class CreateJobRole {
  constructor(private repo: IJobRoleRepository) {}

  async execute(description: string) {
    return this.repo.create(description)
  }
}