import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Shift', schema: 'Payroll' })
export class ShiftEntity {
  @PrimaryGeneratedColumn({ name: 'ShiftID' })
  ShiftID!: number

  @Column({ length: 180 })
  Description!: string

  @Column({ type: 'timestamp' }) Start!: Date
  @Column({ type: 'timestamp' }) RangeStartIn!: Date
  @Column({ type: 'timestamp' }) RangeStartOut!: Date
  @Column({ type: 'timestamp' }) End!: Date
  @Column({ type: 'timestamp' }) RangeEndIn!: Date
  @Column({ type: 'timestamp' }) RangeEndOut!: Date
}
