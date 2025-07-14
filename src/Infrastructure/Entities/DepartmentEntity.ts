import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Department', schema: 'Payroll' })
export class DepartmentEntity {
  @PrimaryGeneratedColumn({ name: 'DepartmentID' })
  DepartmentID!: number

  @Column({ length: 180 })
  Description!: string
}
