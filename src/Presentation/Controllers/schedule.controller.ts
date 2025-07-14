import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMScheduleRepository } from '../../Infrastructure/Repositories/TypeORMScheduleRepository'
import { CreateSchedule } from '../../Application/Schedule/CreateSchedule'
import { GetScheduleById } from '../../Application/Schedule/GetScheduleById'
import { UpdateSchedule } from '../../Application/Schedule/UpdateSchedule'
import { DeleteSchedule } from '../../Application/Schedule/DeleteSchedule'
import { GetPaginatedSchedules } from '../../Application/Schedule/GetPaginatedSchedules'

const repo = new TypeORMScheduleRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createScheduleHandler = async (req: Request, res: Response) => {
  const result = await new CreateSchedule(repo).execute(req.body)
  res.status(201).json(result)
}

export const getScheduleByIdHandler = async (req: Request, res: Response) => {
  const data = await new GetScheduleById(repo).execute(+req.params.id)
  data ? res.json(data) : res.status(404).send()
}

export const updateScheduleHandler = async (req: Request, res: Response) => {
  const result = await new UpdateSchedule(repo).execute(+req.params.id, req.body)
  res.json(result)
}

export const deleteScheduleHandler = async (req: Request, res: Response) => {
  await new DeleteSchedule(repo).execute(+req.params.id)
  res.status(204).send()
}

export const getPaginatedSchedulesHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const result = await new GetPaginatedSchedules(repo).execute(page, limit)
  res.json(result)
}
