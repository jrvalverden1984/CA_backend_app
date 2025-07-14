import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  constructor() {
    this.id = ''
    this.name = ''
    this.email = ''
  }
}
