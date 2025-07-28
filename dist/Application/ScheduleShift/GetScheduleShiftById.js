"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetScheduleShiftById = void 0;
class GetScheduleShiftById {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetScheduleShiftById = GetScheduleShiftById;
//# sourceMappingURL=GetScheduleShiftById.js.map