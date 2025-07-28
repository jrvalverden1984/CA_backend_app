"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleShift = void 0;
class UpdateScheduleShift {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id, scheduleID, shiftID) {
        return this.repo.update(id, scheduleID, shiftID);
    }
}
exports.UpdateScheduleShift = UpdateScheduleShift;
//# sourceMappingURL=UpdateScheduleShift.js.map