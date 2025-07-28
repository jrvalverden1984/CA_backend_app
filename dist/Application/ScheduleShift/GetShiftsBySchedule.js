"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetShiftsBySchedule = void 0;
class GetShiftsBySchedule {
    constructor(repo) {
        this.repo = repo;
    }
    execute(scheduleID) {
        return this.repo.findBySchedule(scheduleID);
    }
}
exports.GetShiftsBySchedule = GetShiftsBySchedule;
//# sourceMappingURL=GetShiftsBySchedule.js.map