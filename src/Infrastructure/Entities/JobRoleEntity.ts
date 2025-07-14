import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'JobRole', schema: 'Payroll' })
export class JobRoleEntity {
  @PrimaryGeneratedColumn({ name: 'JobRoleID' })
  JobRoleID: number

  @Column({ length: 180 })
  Description: string
}