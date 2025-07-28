import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCostCenter1719100000002 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {

    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."CostCenter" (
        "CostCenterID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_CostCenter" PRIMARY KEY ("CostCenterID")
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."CostCenter"`)
  }
}
