"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteHoliday = void 0;
class DeleteHoliday {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteHoliday = DeleteHoliday;
//# sourceMappingURL=DeleteHoliday.js.map