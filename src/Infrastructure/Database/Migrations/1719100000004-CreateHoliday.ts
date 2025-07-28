import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateHoliday1719100000004 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {

    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."Holiday" (
        "HolidayID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "StartDate" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_Holiday" PRIMARY KEY ("HolidayID")
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."Holiday"`)
  }
}
