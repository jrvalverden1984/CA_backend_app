import { IScheduleRepository } from '../../Domain/Schedule/IScheduleRepository'
export class GetScheduleById {
  constructor(private repo: IScheduleRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}