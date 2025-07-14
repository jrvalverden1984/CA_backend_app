"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScheduleShift1719000000000 = void 0;
class CreateScheduleShift1719000000000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`);
        await queryRunner.query(`
      CREATE TABLE "Payroll"."ScheduleShift" (
        "ScheduleShiftID" SERIAL,
        "ScheduleID" INT NOT NULL,
        "ShiftID" INT NOT NULL,
        CONSTRAINT "PK_ScheduleShift" PRIMARY KEY ("ScheduleShiftID"),
        CONSTRAINT "FK_ScheduleShift"
          FOREIGN KEY ("ScheduleID") REFERENCES "Payroll"."Schedule" ("ScheduleID")
          ON DELETE CASCADE,
        CONSTRAINT "FK_ScheduleShift_1"
          FOREIGN KEY ("ShiftID") REFERENCES "Payroll"."Shift" ("ShiftID")
          ON DELETE CASCADE
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "Payroll"."ScheduleShift"`);
    }
}
exports.CreateScheduleShift1719000000000 = CreateScheduleShift1719000000000;
