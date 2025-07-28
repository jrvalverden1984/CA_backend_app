"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchedule = void 0;
class CreateSchedule {
    constructor(repo) {
        this.repo = repo;
    }
    execute(data) {
        return this.repo.create(data);
    }
}
exports.CreateSchedule = CreateSchedule;
//# sourceMappingURL=CreateSchedule.js.map