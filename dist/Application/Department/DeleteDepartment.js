"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDepartment = void 0;
class DeleteDepartment {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteDepartment = DeleteDepartment;
//# sourceMappingURL=DeleteDepartment.js.map