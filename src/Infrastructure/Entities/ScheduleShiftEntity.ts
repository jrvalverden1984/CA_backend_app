import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ScheduleEntity } from './ScheduleEntity'
import { ShiftEntity } from './ShiftEntity'

@Entity({ name: 'ScheduleShift', schema: 'Payroll' })
export class ScheduleShiftEntity {
  @PrimaryGeneratedColumn({ name: 'ScheduleShiftID' })
  ScheduleShiftID!: number

  @Column() ScheduleID!: number
  @Column() ShiftID!: number

  /* Relaciones (opcional para consultas con `join`) */
  @ManyToOne(() => ScheduleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ScheduleID', referencedColumnName: 'ScheduleID', foreignKeyConstraintName: 'FK_ScheduleShift' })
  schedule?: ScheduleEntity

  @ManyToOne(() => ShiftEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ShiftID', referencedColumnName: 'ShiftID', foreignKeyConstraintName: 'FK_ScheduleShift_1' })
  shift?: ShiftEntity
}
