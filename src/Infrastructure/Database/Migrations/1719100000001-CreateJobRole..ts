import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateJobRole1719100000001 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)

    await qr.query(`
      CREATE TABLE "Payroll"."JobRole" (
        "JobRoleID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_JobRole" PRIMARY KEY ("JobRoleID")
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."JobRole"`)
  }
}
