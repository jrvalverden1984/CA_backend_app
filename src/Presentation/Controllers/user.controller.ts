import { Request, Response } from 'express'
import { CreateUser } from '../../Application/User/CreateUser'
import { TypeORMUserRepository } from '../../Infrastructure/Repositories/TypeORMUserRepository'
import { AppDataSource } from '../../Infrastructure/Database/data-source'

const repo = new TypeORMUserRepository()
const createUser = new CreateUser(repo)

AppDataSource.initialize().then(() => {
  console.log('📦 TypeORM conectado a PostgreSQL')
}).catch((error) => console.error('Error al conectar TypeORM:', error))

export const createUserHandler = async (req: Request, res: Response) => {
  const { id, name, email } = req.body
  await createUser.execute(id, name, email)
  res.status(201).send({ message: 'User created' })
}
