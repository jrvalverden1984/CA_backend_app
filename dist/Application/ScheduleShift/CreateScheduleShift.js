"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScheduleShift = void 0;
class CreateScheduleShift {
    constructor(repo) {
        this.repo = repo;
    }
    execute(scheduleID, shiftID) {
        return this.repo.create(scheduleID, shiftID);
    }
}
exports.CreateScheduleShift = CreateScheduleShift;
//# sourceMappingURL=CreateScheduleShift.js.map