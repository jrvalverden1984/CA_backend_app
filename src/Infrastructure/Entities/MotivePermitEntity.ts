import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'MotivePermit', schema: 'Payroll' })
export class MotivePermitEntity {
  @PrimaryGeneratedColumn({ name: 'MotivePermitID' })
  MotivePermitID!: number

  @Column({ length: 180 })
  Description!: string
}
