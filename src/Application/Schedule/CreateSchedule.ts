import { IScheduleRepository } from '../../Domain/Schedule/IScheduleRepository'
import { Schedule } from '../../Domain/Schedule/Schedule'
export class CreateSchedule {
  constructor(private repo: IScheduleRepository) {}
  execute(data: Omit<Schedule, 'ScheduleID'>) {
    return this.repo.create(data)
  }
}