"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShift1719100000005 = void 0;
class CreateShift1719100000005 {
    async up(qr) {
        await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."Shift" (
        "ShiftID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "Start" TIMESTAMP NOT NULL,
        "RangeStartIn" TIMESTAMP NOT NULL,
        "RangeStartOut" TIMESTAMP NOT NULL,
        "End" TIMESTAMP NOT NULL,
        "RangeEndIn" TIMESTAMP NOT NULL,
        "RangeEndOut" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_Shift" PRIMARY KEY ("ShiftID")
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."Shift"`);
    }
}
exports.CreateShift1719100000005 = CreateShift1719100000005;
//# sourceMappingURL=1719100000005-CreateShift.js.map