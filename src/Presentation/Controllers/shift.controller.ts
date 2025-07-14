import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMShiftRepository } from '../../Infrastructure/Repositories/TypeORMShiftRepository'
import { CreateShift } from '../../Application/Shift/CreateShift'
import { GetShiftById } from '../../Application/Shift/GetShiftById'
import { UpdateShift } from '../../Application/Shift/UpdateShift'
import { DeleteShift } from '../../Application/Shift/DeleteShift'
import { GetPaginatedShifts } from '../../Application/Shift/GetPaginatedShifts'

const repo = new TypeORMShiftRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))


export const createShiftHandler = async (req: Request, res: Response) => {
  const result = await new CreateShift(repo).execute(req.body)
  res.status(201).json(result)
}

export const getShiftByIdHandler = async (req: Request, res: Response) => {
  const data = await new GetShiftById(repo).execute(+req.params.id)
  data ? res.json(data) : res.status(404).send()
}

export const updateShiftHandler = async (req: Request, res: Response) => {
  const result = await new UpdateShift(repo).execute(+req.params.id, req.body)
  res.json(result)
}

export const deleteShiftHandler = async (_: Request, res: Response) => {
  await new DeleteShift(repo).execute(+_.params.id)
  res.status(204).send()
}

export const getPaginatedShiftsHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  res.json(await new GetPaginatedShifts(repo).execute(page, limit))
}
