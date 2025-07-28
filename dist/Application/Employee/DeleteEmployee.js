"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEmployee = void 0;
class DeleteEmployee {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteEmployee = DeleteEmployee;
//# sourceMappingURL=DeleteEmployee.js.map