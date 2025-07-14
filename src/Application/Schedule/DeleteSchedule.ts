import { IScheduleRepository } from '../../Domain/Schedule/IScheduleRepository'
export class DeleteSchedule {
  constructor(private repo: IScheduleRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}