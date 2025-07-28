import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateWorkPermit1719100000011 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."WorkPermit" (
        "WorkPermitID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "EmployeeID" INTEGER NOT NULL,
        "MotivePermitID" INTEGER NOT NULL,
        "StartDate" TIMESTAMP NOT NULL,
        "EndDate" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_WorkPermit" PRIMARY KEY ("WorkPermitID"),
        CONSTRAINT "FK_WorkPermit_Employee" FOREIGN KEY ("EmployeeID") REFERENCES "Payroll"."Employee"("EmployeeID"),
        CONSTRAINT "FK_WorkPermit_Motive" FOREIGN KEY ("MotivePermitID") REFERENCES "Payroll"."MotivePermit"("MotivePermitID")
      );
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."WorkPermit"`)
  }
}
