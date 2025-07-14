"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScheduleShift1719100000007 = void 0;
class CreateScheduleShift1719100000007 {
    async up(qr) {
        //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)
        await qr.query(`
      CREATE TABLE "Payroll"."ScheduleShift" (
        "ScheduleShiftID" SERIAL,
        "ScheduleID" INTEGER NOT NULL,
        "ShiftID" INTEGER NOT NULL,
        CONSTRAINT "PK_ScheduleShift" PRIMARY KEY ("ScheduleShiftID"),
        CONSTRAINT "FK_ScheduleShift"
          FOREIGN KEY ("ScheduleID") REFERENCES "Payroll"."Schedule"("ScheduleID")
          ON DELETE CASCADE,
        CONSTRAINT "FK_ScheduleShift_1"
          FOREIGN KEY ("ShiftID") REFERENCES "Payroll"."Shift"("ShiftID")
          ON DELETE CASCADE
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."ScheduleShift"`);
    }
}
exports.CreateScheduleShift1719100000007 = CreateScheduleShift1719100000007;
