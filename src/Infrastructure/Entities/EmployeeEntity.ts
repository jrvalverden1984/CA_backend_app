import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from 'typeorm'
import { DepartmentEntity } from './DepartmentEntity'
import { JobRoleEntity } from './JobRoleEntity'
import { CostCenterEntity } from './CostCenterEntity'
import { ScheduleEntity } from './ScheduleEntity'

@Entity({ name: 'Employee', schema: 'Payroll' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn({ name: 'EmployeeID' })
  EmployeeID!: number

  @Column({ length: 15 }) IdentificationNumber!: string
  @Column({ length: 35 }) FirstName!: string
  @Column({ length: 35 }) LastName!: string

  @Column() DepartmentID!: number
  @Column() JobRoleID!: number
  @Column() CostCenterID!: number
  @Column() ScheduleID!: number

  @Column({ type: 'timestamp' }) HireDate!: Date
  @Column({ type: 'boolean' }) Overtime!: boolean
  @Column({ type: 'numeric', precision: 18, scale: 4 }) Salary!: number
  @Column({ type: 'boolean' }) IsActive!: boolean
  @Column({ type: 'bytea', nullable: true }) Photo!: Buffer | null

  /* Relaciones (opcionales) */
  @ManyToOne(() => DepartmentEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'DepartmentID',
    referencedColumnName: 'DepartmentID',
    foreignKeyConstraintName: 'FK_Employee_Department'
  })
  department?: DepartmentEntity

  @ManyToOne(() => JobRoleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'JobRoleID',
    referencedColumnName: 'JobRoleID',
    foreignKeyConstraintName: 'FK_Employee_JobRole'
  })
  jobRole?: JobRoleEntity

  @ManyToOne(() => CostCenterEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'CostCenterID',
    referencedColumnName: 'CostCenterID',
    foreignKeyConstraintName: 'FK_Employee_CostCenter'
  })
  costCenter?: CostCenterEntity

  @ManyToOne(() => ScheduleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'ScheduleID',
    referencedColumnName: 'ScheduleID',
    foreignKeyConstraintName: 'FK_Employee_Schedule'
  })
  schedule?: ScheduleEntity
}
