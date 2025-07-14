import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateScheduleShift1719100000007 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)

    await qr.query(`
      CREATE TABLE "Payroll"."ScheduleShift" (
        "ScheduleShiftID" SERIAL,
        "ScheduleID" INTEGER NOT NULL,
        "ShiftID" INTEGER NOT NULL,
        CONSTRAINT "PK_ScheduleShift" PRIMARY KEY ("ScheduleShiftID"),
        CONSTRAINT "FK_ScheduleShift"
          FOREIGN KEY ("ScheduleID") REFERENCES "Payroll"."Schedule"("ScheduleID")
          ON DELETE CASCADE,
        CONSTRAINT "FK_ScheduleShift_1"
          FOREIGN KEY ("ShiftID") REFERENCES "Payroll"."Shift"("ShiftID")
          ON DELETE CASCADE
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."ScheduleShift"`)
  }
}
