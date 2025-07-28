"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedScheduleShifts = void 0;
class GetPaginatedScheduleShifts {
    constructor(repo) {
        this.repo = repo;
    }
    execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedScheduleShifts = GetPaginatedScheduleShifts;
//# sourceMappingURL=GetPaginatedScheduleShifts.js.map