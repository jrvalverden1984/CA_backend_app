import { IUserRepository } from '../../Domain/User/IUserRepository'
import { User } from '../../Domain/User/User'

export class CreateUser {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string, name: string, email: string): Promise<void> {
    const user = new User(id, name, email)
    await this.userRepo.save(user)
  }
}