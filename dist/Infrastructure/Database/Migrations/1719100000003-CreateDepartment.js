"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartment1719100000003 = void 0;
class CreateDepartment1719100000003 {
    async up(qr) {
        //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)
        await qr.query(`
      CREATE TABLE "Payroll"."Department" (
        "DepartmentID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_Department" PRIMARY KEY ("DepartmentID")
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."Department"`);
    }
}
exports.CreateDepartment1719100000003 = CreateDepartment1719100000003;
