"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
class Schedule {
    constructor(ScheduleID, Description, ShortName, MinuteBeforeInput, MinuteAfterOutput, MinuteDelay, ShiftType, MinuteLunch, Start, RangeStartIn, RangeStartOut, End, RangeEndIn, RangeEndOut) {
        this.ScheduleID = ScheduleID;
        this.Description = Description;
        this.ShortName = ShortName;
        this.MinuteBeforeInput = MinuteBeforeInput;
        this.MinuteAfterOutput = MinuteAfterOutput;
        this.MinuteDelay = MinuteDelay;
        this.ShiftType = ShiftType;
        this.MinuteLunch = MinuteLunch;
        this.Start = Start;
        this.RangeStartIn = RangeStartIn;
        this.RangeStartOut = RangeStartOut;
        this.End = End;
        this.RangeEndIn = RangeEndIn;
        this.RangeEndOut = RangeEndOut;
    }
}
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map