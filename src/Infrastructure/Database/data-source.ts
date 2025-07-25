import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserEntity } from '../Entities/UserEntity'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [UserEntity],
  migrations: ['src/Infrastructure/Database/Migrations/*.ts'],
  subscribers: []
})