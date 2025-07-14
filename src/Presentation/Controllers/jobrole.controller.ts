import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMJobRoleRepository } from '../../Infrastructure/Repositories/TypeORMJobRoleRepository'
import { CreateJobRole } from '../../Application/JobRole/CreateJobRole'
import { GetJobRoleById } from '../../Application/JobRole/GetJobRoleById'
import { UpdateJobRole } from '../../Application/JobRole/UpdateJobRole'
import { DeleteJobRole } from '../../Application/JobRole/DeleteJobRole'
import { GetPaginatedJobRoles } from '../../Application/JobRole/GetPaginatedJobRoles'

const repo = new TypeORMJobRoleRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createJobRoleHandler = async (req: Request, res: Response) => {
  const { description } = req.body
  const useCase = new CreateJobRole(repo)
  const result = await useCase.execute(description)
  res.status(201).json(result)
}

export const getJobRoleByIdHandler = async (req: Request, res: Response) => {
  const useCase = new GetJobRoleById(repo)
  const result = await useCase.execute(Number(req.params.id))
  if (!result) return res.status(404).send()
  res.json(result)
}

export const updateJobRoleHandler = async (req: Request, res: Response) => {
  const { description } = req.body
  const useCase = new UpdateJobRole(repo)
  const result = await useCase.execute(Number(req.params.id), description)
  res.json(result)
}

export const deleteJobRoleHandler = async (req: Request, res: Response) => {
  const useCase = new DeleteJobRole(repo)
  await useCase.execute(Number(req.params.id))
  res.status(204).send()
}

export const getPaginatedJobRolesHandler = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const useCase = new GetPaginatedJobRoles(repo)
  const result = await useCase.execute(Number(page), Number(limit))
  res.json(result)
}
