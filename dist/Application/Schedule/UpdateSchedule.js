"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchedule = void 0;
class UpdateSchedule {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id, data) {
        return this.repo.update(id, data);
    }
}
exports.UpdateSchedule = UpdateSchedule;
