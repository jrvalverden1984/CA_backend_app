"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHoliday = void 0;
class UpdateHoliday {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id, description, startDate) {
        return this.repo.update(id, description, startDate);
    }
}
exports.UpdateHoliday = UpdateHoliday;
//# sourceMappingURL=UpdateHoliday.js.map