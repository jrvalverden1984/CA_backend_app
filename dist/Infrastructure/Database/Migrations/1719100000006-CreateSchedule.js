"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchedule1719100000006 = void 0;
class CreateSchedule1719100000006 {
    async up(qr) {
        //await qr.query(`CREATE SCHEMA IF NOT EXISTS "Payroll"`)
        await qr.query(`
      CREATE TABLE "Payroll"."Schedule" (
        "ScheduleID" SERIAL,
        "Description" VARCHAR(180) NOT NULL,
        "ShortName" VARCHAR(25) NOT NULL,
        "MinuteBeforeInput" INTEGER NOT NULL,
        "MinuteAfterOutput" INTEGER NOT NULL,
        "MinuteDelay" INTEGER NOT NULL,
        "ShiftType" INTEGER NOT NULL,
        "MinuteLunch" INTEGER NOT NULL,
        "Start" TIMESTAMP NOT NULL,
        "RangeStartIn" TIMESTAMP NOT NULL,
        "RangeStartOut" TIMESTAMP NOT NULL,
        "End" TIMESTAMP NOT NULL,
        "RangeEndIn" TIMESTAMP NOT NULL,
        "RangeEndOut" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_Schedule" PRIMARY KEY ("ScheduleID")
      )
    `);
    }
    async down(qr) {
        await qr.query(`DROP TABLE IF EXISTS "Payroll"."Schedule"`);
    }
}
exports.CreateSchedule1719100000006 = CreateSchedule1719100000006;
