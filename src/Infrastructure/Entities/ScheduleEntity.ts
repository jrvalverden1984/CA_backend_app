import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Schedule', schema: 'Payroll' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'ScheduleID' })
  ScheduleID!: number

  @Column({ length: 180 }) Description!: string
  @Column({ length: 25 }) ShortName!: string
  @Column() MinuteBeforeInput!: number
  @Column() MinuteAfterOutput!: number
  @Column() MinuteDelay!: number
  @Column() ShiftType!: number
  @Column() MinuteLunch!: number

  @Column({ type: 'timestamp' }) Start!: Date
  @Column({ type: 'timestamp' }) RangeStartIn!: Date
  @Column({ type: 'timestamp' }) RangeStartOut!: Date
  @Column({ type: 'timestamp' }) End!: Date
  @Column({ type: 'timestamp' }) RangeEndIn!: Date
  @Column({ type: 'timestamp' }) RangeEndOut!: Date
}
