"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHoliday = void 0;
class CreateHoliday {
    constructor(repo) {
        this.repo = repo;
    }
    execute(description, startDate) {
        return this.repo.create(description, startDate);
    }
}
exports.CreateHoliday = CreateHoliday;
//# sourceMappingURL=CreateHoliday.js.map