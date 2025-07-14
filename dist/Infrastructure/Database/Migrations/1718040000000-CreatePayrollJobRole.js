"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayrollJobRole1718040000000 = void 0;
class CreatePayrollJobRole1718040000000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`);
        await queryRunner.query(`
            CREATE TABLE "Payroll"."JobRole" (
                "JobRoleID" SERIAL PRIMARY KEY,
                "Description" VARCHAR(180) NOT NULL,
                CONSTRAINT "PK_JobRole" PRIMARY KEY ("JobRoleID")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "Payroll"."JobRole"`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "Payroll"`);
    }
}
exports.CreatePayrollJobRole1718040000000 = CreatePayrollJobRole1718040000000;
