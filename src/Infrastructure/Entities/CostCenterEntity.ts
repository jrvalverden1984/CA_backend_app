import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'CostCenter', schema: 'Payroll' })
export class CostCenterEntity {
  @PrimaryGeneratedColumn({ name: 'CostCenterID' })
  CostCenterID!: number

  @Column({ length: 180 })
  Description!: string
}
