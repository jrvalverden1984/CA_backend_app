"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedShifts = void 0;
class GetPaginatedShifts {
    constructor(repo) {
        this.repo = repo;
    }
    execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedShifts = GetPaginatedShifts;
//# sourceMappingURL=GetPaginatedShifts.js.map