import { IScheduleRepository } from '../../Domain/Schedule/IScheduleRepository'
import { Schedule } from '../../Domain/Schedule/Schedule'
export class UpdateSchedule {
  constructor(private repo: IScheduleRepository) {}
  execute(id: number, data: Omit<Schedule, 'ScheduleID'>) {
    return this.repo.update(id, data)
  }
}