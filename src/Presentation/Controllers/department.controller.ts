import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMDepartmentRepository } from '../../Infrastructure/Repositories/TypeORMDepartmentRepository'
import { CreateDepartment } from '../../Application/Department/CreateDepartment'
import { GetDepartmentById } from '../../Application/Department/GetDepartmentById'
import { UpdateDepartment } from '../../Application/Department/UpdateDepartment'
import { DeleteDepartment } from '../../Application/Department/DeleteDepartment'
import { GetPaginatedDepartments } from '../../Application/Department/GetPaginatedDepartments'

const repo = new TypeORMDepartmentRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createDepartmentHandler = async (req: Request, res: Response) => {
  const { description } = req.body
  const useCase = new CreateDepartment(repo)
  const result = await useCase.execute(description)
  res.status(201).json(result)
}

export const getDepartmentByIdHandler = async (req: Request, res: Response) => {
  const useCase = new GetDepartmentById(repo)
  const result = await useCase.execute(parseInt(req.params.id))
  if (!result) return res.status(404).send()
  res.json(result)
}

export const updateDepartmentHandler = async (req: Request, res: Response) => {
  const { description } = req.body
  const useCase = new UpdateDepartment(repo)
  const result = await useCase.execute(parseInt(req.params.id), description)
  res.json(result)
}

export const deleteDepartmentHandler = async (req: Request, res: Response) => {
  const useCase = new DeleteDepartment(repo)
  await useCase.execute(parseInt(req.params.id))
  res.status(204).send()
}

export const getPaginatedDepartmentsHandler = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const useCase = new GetPaginatedDepartments(repo)
  const result = await useCase.execute(Number(page), Number(limit))
  res.json(result)
}
