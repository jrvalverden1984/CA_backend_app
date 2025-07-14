"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetScheduleById = void 0;
class GetScheduleById {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetScheduleById = GetScheduleById;
