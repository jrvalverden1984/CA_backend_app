import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateEmployee1719100000008 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."Employee" (
        "EmployeeID" SERIAL,
        "IdentificationNumber" VARCHAR(15) NOT NULL,
        "FirstName" VARCHAR(35) NOT NULL,
        "LastName" VARCHAR(35) NOT NULL,
        "DepartmentID" INTEGER,
        "JobRoleID" INTEGER,
        "CostCenterID" INTEGER,
        "ScheduleID" INTEGER,
        "HireDate" TIMESTAMP NOT NULL,
        "Overtime" BOOLEAN NOT NULL,
        "Salary" NUMERIC(18,4) NOT NULL,
        "IsActive" BOOLEAN NOT NULL,
        "Photo" BYTEA,
        CONSTRAINT "PK_Employee" PRIMARY KEY ("EmployeeID"),
        CONSTRAINT "FK_Employee_Department"
          FOREIGN KEY ("DepartmentID") REFERENCES "Payroll"."Department"("DepartmentID")
          ON DELETE SET NULL,
        CONSTRAINT "FK_Employee_JobRole"
          FOREIGN KEY ("JobRoleID") REFERENCES "Payroll"."JobRole"("JobRoleID")
          ON DELETE SET NULL,
        CONSTRAINT "FK_Employee_CostCenter"
          FOREIGN KEY ("CostCenterID") REFERENCES "Payroll"."CostCenter"("CostCenterID")
          ON DELETE SET NULL,
        CONSTRAINT "FK_Employee_Schedule"
          FOREIGN KEY ("ScheduleID") REFERENCES "Payroll"."Schedule"("ScheduleID")
          ON DELETE SET NULL
      )
    `)
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Payroll"."Employee"`)
  }
}
