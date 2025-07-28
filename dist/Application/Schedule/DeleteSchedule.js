"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSchedule = void 0;
class DeleteSchedule {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteSchedule = DeleteSchedule;
//# sourceMappingURL=DeleteSchedule.js.map