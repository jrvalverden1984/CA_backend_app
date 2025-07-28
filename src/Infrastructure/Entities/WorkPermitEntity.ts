import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EmployeeEntity } from './EmployeeEntity'
import { MotivePermitEntity } from './MotivePermitEntity'

@Entity({ name: 'WorkPermit', schema: 'Payroll' })
export class WorkPermitEntity {
  @PrimaryGeneratedColumn()
  WorkPermitID!: number

  @Column({ length: 180 })
  Description!: string

  @Column()
  EmployeeID!: number

  @Column()
  MotivePermitID!: number

  @Column()
  StartDate!: Date

  @Column()
  EndDate!: Date

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({ name: 'EmployeeID' })
  Employee!: EmployeeEntity

  @ManyToOne(() => MotivePermitEntity)
  @JoinColumn({ name: 'MotivePermitID' })
  MotivePermit!: MotivePermitEntity
}
