import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Holiday', schema: 'Payroll' })
export class HolidayEntity {
  @PrimaryGeneratedColumn({ name: 'HolidayID' })
  HolidayID!: number

  @Column({ length: 180 })
  Description!: string

  @Column({ type: 'timestamp' })
  StartDate!: Date
}
