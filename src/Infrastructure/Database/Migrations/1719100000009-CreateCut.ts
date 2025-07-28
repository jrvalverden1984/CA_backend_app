import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCut1719100000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."Cut" (
        "CutID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "StartDate" TIMESTAMP NOT NULL,
        "EndDate" TIMESTAMP NOT NULL,
        "IsModifiable" BOOLEAN NOT NULL,
        CONSTRAINT "PK_Cut" PRIMARY KEY ("CutID")
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Payroll"."Cut"`)
  }
}
