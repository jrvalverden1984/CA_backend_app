import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDepartment1719100000003 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)

    await qr.query(`
      CREATE TABLE "Payroll"."Department" (
        "DepartmentID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_Department" PRIMARY KEY ("DepartmentID")
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."Department"`)
  }
}
