"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCostCenter1719100000002 = void 0;
class CreateCostCenter1719100000002 {
    async up(qr) {
        //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)
        await qr.query(`
      CREATE TABLE "Payroll"."CostCenter" (
        "CostCenterID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        CONSTRAINT "PK_CostCenter" PRIMARY KEY ("CostCenterID")
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."CostCenter"`);
    }
}
exports.CreateCostCenter1719100000002 = CreateCostCenter1719100000002;
