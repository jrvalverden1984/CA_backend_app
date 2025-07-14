import { IJobRoleRepository } from '../../Domain/JobRole/IJobRoleRepository'

export class DeleteJobRole {
  constructor(private repo: IJobRoleRepository) {}

  async execute(id: number) {
    return this.repo.delete(id)
  }
}