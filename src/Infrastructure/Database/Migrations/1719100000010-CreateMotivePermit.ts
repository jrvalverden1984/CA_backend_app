import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMotivePermit1719100000010 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."MotivePermit" (
        "MotivePermitID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_MotivePermit" PRIMARY KEY ("MotivePermitID")
      );
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."MotivePermit"`)
  }
}
