import { User } from '../../Domain/User/User'
import { IUserRepository } from '../../Domain/User/IUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  private users = new Map<string, User>()

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user)
  }
}