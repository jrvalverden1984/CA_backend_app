import { IUserRepository } from '../../Domain/User/IUserRepository'
import { User } from '../../Domain/User/User'
import { AppDataSource } from '../Database/data-source'
import { UserEntity } from '../Entities/UserEntity'

export class TypeORMUserRepository implements IUserRepository {
  private repo = AppDataSource.getRepository(UserEntity)

  async findById(id: string): Promise<User | null> {
    const user = await this.repo.findOneBy({ id })
    if (!user) return null
    return new User(user.id, user.name, user.email)
  }

  async save(user: User): Promise<void> {
    const userEntity = this.repo.create(user)
    await this.repo.save(userEntity)
  }
}