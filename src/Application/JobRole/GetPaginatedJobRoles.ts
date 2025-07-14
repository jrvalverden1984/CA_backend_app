import { IJobRoleRepository } from '../../Domain/JobRole/IJobRoleRepository'

export class GetPaginatedJobRoles {
  constructor(private repo: IJobRoleRepository) {}

  async execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}