import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Cut', schema: 'Payroll' })
export class CutEntity {
  @PrimaryGeneratedColumn({ name: 'CutID' })
  CutID: number

  @Column({ length: 180 })
  Description: string

  @Column({ type: 'timestamp' })
  StartDate: Date

  @Column({ type: 'timestamp' })
  EndDate: Date

  @Column({ type: 'boolean' })
  IsModifiable: boolean
}
