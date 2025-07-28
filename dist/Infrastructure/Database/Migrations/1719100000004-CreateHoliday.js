"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHoliday1719100000004 = void 0;
class CreateHoliday1719100000004 {
    async up(qr) {
        await qr.query(`
      CREATE TABLE IF NOT EXISTS "Payroll"."Holiday" (
        "HolidayID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "StartDate" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_Holiday" PRIMARY KEY ("HolidayID")
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."Holiday"`);
    }
}
exports.CreateHoliday1719100000004 = CreateHoliday1719100000004;
//# sourceMappingURL=1719100000004-CreateHoliday.js.map