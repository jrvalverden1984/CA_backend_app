"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployee = void 0;
class UpdateEmployee {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id, data) {
        return this.repo.update(id, data);
    }
}
exports.UpdateEmployee = UpdateEmployee;
//# sourceMappingURL=UpdateEmployee.js.map