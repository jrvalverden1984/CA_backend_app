"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaginatedHolidays = void 0;
class GetPaginatedHolidays {
    constructor(repo) {
        this.repo = repo;
    }
    execute(page, limit) {
        return this.repo.getPaginated(page, limit);
    }
}
exports.GetPaginatedHolidays = GetPaginatedHolidays;
