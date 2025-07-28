import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateShift1719100000005 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."Shift" (
        "ShiftID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "Start" TIMESTAMP NOT NULL,
        "RangeStartIn" TIMESTAMP NOT NULL,
        "RangeStartOut" TIMESTAMP NOT NULL,
        "End" TIMESTAMP NOT NULL,
        "RangeEndIn" TIMESTAMP NOT NULL,
        "RangeEndOut" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_Shift" PRIMARY KEY ("ShiftID")
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."Shift"`)
  }
}
