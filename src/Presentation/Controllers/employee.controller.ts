import { Request, Response } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMEmployeeRepository } from '../../Infrastructure/Repositories/TypeORMEmployeeRepository'
import { CreateEmployee } from '../../Application/Employee/CreateEmployee'
import { GetEmployeeById } from '../../Application/Employee/GetEmployeeById'
import { UpdateEmployee } from '../../Application/Employee/UpdateEmployee'
import { DeleteEmployee } from '../../Application/Employee/DeleteEmployee'
import { GetPaginatedEmployees } from '../../Application/Employee/GetPaginatedEmployees'

const repo = new TypeORMEmployeeRepository()

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createEmployeeHandler = async (req: Request, res: Response) => {
  const result = await new CreateEmployee(repo).execute(req.body)
  res.status(201).json(result)
}

export const getEmployeeByIdHandler = async (req: Request, res: Response) => {
  const data = await new GetEmployeeById(repo).execute(+req.params.id)
  data ? res.json(data) : res.status(404).send()
}

export const updateEmployeeHandler = async (req: Request, res: Response) => {
  const result = await new UpdateEmployee(repo).execute(+req.params.id, req.body)
  res.json(result)
}

export const deleteEmployeeHandler = async (req: Request, res: Response) => {
  await new DeleteEmployee(repo).execute(+req.params.id)
  res.status(204).send()
}

export const getPaginatedEmployeesHandler = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  res.json(await new GetPaginatedEmployees(repo).execute(page, limit))
}
