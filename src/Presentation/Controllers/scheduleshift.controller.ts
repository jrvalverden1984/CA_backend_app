import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMScheduleShiftRepository } from '../../Infrastructure/Repositories/TypeORMScheduleShiftRepository'
import { CreateScheduleShift } from '../../Application/ScheduleShift/CreateScheduleShift'
import { GetScheduleShiftById } from '../../Application/ScheduleShift/GetScheduleShiftById'
import { UpdateScheduleShift } from '../../Application/ScheduleShift/UpdateScheduleShift'
import { DeleteScheduleShift } from '../../Application/ScheduleShift/DeleteScheduleShift'
import { GetPaginatedScheduleShifts } from '../../Application/ScheduleShift/GetPaginatedScheduleShifts'
import { AssignShiftsToSchedule } from '../../Application/ScheduleShift/AssignShiftsToSchedule'
import { GetShiftsBySchedule } from '../../Application/ScheduleShift/GetShiftsBySchedule'

const repo = new TypeORMScheduleShiftRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createScheduleShiftHandler = async (req: Request, res: Response) => {
  const { scheduleID, shiftID } = req.body
  const result = await new CreateScheduleShift(repo).execute(scheduleID, shiftID)
  res.status(201).json(result)
}

export const getScheduleShiftByIdHandler = async (req: Request, res: Response) => {
  const data = await new GetScheduleShiftById(repo).execute(+req.params.id)
  data ? res.json(data) : res.status(404).send()
}

export const updateScheduleShiftHandler = async (req: Request, res: Response) => {
  const { scheduleID, shiftID } = req.body
  const result = await new UpdateScheduleShift(repo).execute(+req.params.id, scheduleID, shiftID)
  res.json(result)
}

export const deleteScheduleShiftHandler = async (req: Request, res: Response) => {
  await new DeleteScheduleShift(repo).execute(+req.params.id)
  res.status(204).send()
}

export const getPaginatedScheduleShiftsHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const result = await new GetPaginatedScheduleShifts(repo).execute(page, limit)
  res.json(result)
}

export const assignShiftsToScheduleHandler = async (req: Request, res: Response) => {
  const { scheduleID, shiftIDs } = req.body  // shiftIDs: number[]
  const result = await new AssignShiftsToSchedule(repo).execute(scheduleID, shiftIDs)
  res.status(200).json(result)
}

export const getShiftsByScheduleHandler = async (req: Request, res: Response) => {
  const result = await new GetShiftsBySchedule(repo).execute(+req.params.scheduleID)
  res.json(result)
}