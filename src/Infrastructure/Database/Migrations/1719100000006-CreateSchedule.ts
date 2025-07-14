import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSchedule1719100000006 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)

    await qr.query(`
      CREATE TABLE "Payroll"."Schedule" (
        "ScheduleID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "ShortName" VARCHAR(25) NOT NULL,
        "MinuteBeforeInput" INTEGER NOT NULL,
        "MinuteAfterOutput" INTEGER NOT NULL,
        "MinuteDelay" INTEGER NOT NULL,
        "ShiftType" INTEGER NOT NULL,
        "MinuteLunch" INTEGER NOT NULL,
        "Start" TIMESTAMP NOT NULL,
        "RangeStartIn" TIMESTAMP NOT NULL,
        "RangeStartOut" TIMESTAMP NOT NULL,
        "End" TIMESTAMP NOT NULL,
        "RangeEndIn" TIMESTAMP NOT NULL,
        "RangeEndOut" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_Schedule" PRIMARY KEY ("ScheduleID")
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."Schedule"`)
  }
}
