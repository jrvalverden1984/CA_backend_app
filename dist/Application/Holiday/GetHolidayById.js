"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHolidayById = void 0;
class GetHolidayById {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetHolidayById = GetHolidayById;
