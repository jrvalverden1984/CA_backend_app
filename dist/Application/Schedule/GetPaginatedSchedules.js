"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedSchedules = void 0;
class GetPaginatedSchedules {
    constructor(repo) {
        this.repo = repo;
    }
    execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedSchedules = GetPaginatedSchedules;
//# sourceMappingURL=GetPaginatedSchedules.js.map