import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMHolidayRepository } from '../../Infrastructure/Repositories/TypeORMHolidayRepository'
import { CreateHoliday } from '../../Application/Holiday/CreateHoliday'
import { GetHolidayById } from '../../Application/Holiday/GetHolidayById'
import { UpdateHoliday } from '../../Application/Holiday/UpdateHoliday'
import { DeleteHoliday } from '../../Application/Holiday/DeleteHoliday'
import { GetPaginatedHolidays } from '../../Application/Holiday/GetPaginatedHolidays'

const repo = new TypeORMHolidayRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createHolidayHandler = async (req: Request, res: Response) => {
  const { description, startDate } = req.body
  const result = await new CreateHoliday(repo).execute(description, new Date(startDate))
  res.status(201).json(result)
}

export const getHolidayByIdHandler = async (req: Request, res: Response) => {
  const data = await new GetHolidayById(repo).execute(Number(req.params.id))
  data ? res.json(data) : res.status(404).send()
}

export const updateHolidayHandler = async (req: Request, res: Response) => {
  const { description, startDate } = req.body
  const result = await new UpdateHoliday(repo).execute(
    Number(req.params.id),
    description,
    new Date(startDate)
  )
  res.json(result)
}

export const deleteHolidayHandler = async (req: Request, res: Response) => {
  await new DeleteHoliday(repo).execute(Number(req.params.id))
  res.status(204).send()
}

export const getPaginatedHolidaysHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const result = await new GetPaginatedHolidays(repo).execute(page, limit)
  res.json(result)
}
