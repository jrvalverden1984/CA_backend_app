"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobRole1719100000001 = void 0;
class CreateJobRole1719100000001 {
    async up(qr) {
        //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)
        await qr.query(`
      CREATE TABLE "Payroll"."JobRole" (
        "JobRoleID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_JobRole" PRIMARY KEY ("JobRoleID")
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."JobRole"`);
    }
}
exports.CreateJobRole1719100000001 = CreateJobRole1719100000001;
