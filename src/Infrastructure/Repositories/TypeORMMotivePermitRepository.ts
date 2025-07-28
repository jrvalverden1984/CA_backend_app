import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { MotivePermitEntity } from '../Entities/MotivePermitEntity'
import { MotivePermit } from '../../Domain/MotivePermit/MotivePermit'
import { IMotivePermitRepository } from '../../Domain/MotivePermit/IMotivePermitRepository'

export class TypeORMMotivePermitRepository implements IMotivePermitRepository {
  private repo: Repository<MotivePermitEntity> = AppDataSource.getRepository(MotivePermitEntity)

  async create(description: string): Promise<MotivePermit> {
    const entity = this.repo.create({ Description: description })
    const saved = await this.repo.save(entity)
    return this.toDomain(saved)
  }

  async getById(id: number): Promise<MotivePermit | null> {
    const found = await this.repo.findOneBy({ MotivePermitID: id })
    return found ? this.toDomain(found) : null
  }

  async update(id: number, description: string): Promise<MotivePermit | null> {
    await this.repo.update(id, { Description: description })
    return this.getById(id)
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number): Promise<MotivePermit[]> {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }

  private toDomain(entity: MotivePermitEntity): MotivePermit {
    return new MotivePermit(entity.MotivePermitID, entity.Description)
  }
}
