"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteScheduleShift = void 0;
class DeleteScheduleShift {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteScheduleShift = DeleteScheduleShift;
