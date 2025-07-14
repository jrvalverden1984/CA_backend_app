import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMCostCenterRepository } from '../../Infrastructure/Repositories/TypeORMCostCenterRepository'
import { CreateCostCenter } from '../../Application/CostCenter/CreateCostCenter'
import { GetCostCenterById } from '../../Application/CostCenter/GetCostCenterById'
import { UpdateCostCenter } from '../../Application/CostCenter/UpdateCostCenter'
import { DeleteCostCenter } from '../../Application/CostCenter/DeleteCostCenter'
import { GetPaginatedCostCenters } from '../../Application/CostCenter/GetPaginatedCostCenters'

const repo = new TypeORMCostCenterRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createCostCenterHandler = async (req: Request, res: Response) => {
  const { description } = req.body
  const useCase = new CreateCostCenter(repo)
  const result = await useCase.execute(description)
  res.status(201).json(result)
}

export const getCostCenterByIdHandler = async (req: Request, res: Response) => {
  const useCase = new GetCostCenterById(repo)
  const result = await useCase.execute(Number(req.params.id))
  if (!result) return res.status(404).send()
  res.json(result)
}

export const updateCostCenterHandler = async (req: Request, res: Response) => {
  const { description } = req.body
  const useCase = new UpdateCostCenter(repo)
  const result = await useCase.execute(Number(req.params.id), description)
  res.json(result)
}

export const deleteCostCenterHandler = async (req: Request, res: Response) => {
  const useCase = new DeleteCostCenter(repo)
  await useCase.execute(Number(req.params.id))
  res.status(204).send()
}

export const getPaginatedCostCentersHandler = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const useCase = new GetPaginatedCostCenters(repo)
  const result = await useCase.execute(Number(page), Number(limit))
  res.json(result)
}
