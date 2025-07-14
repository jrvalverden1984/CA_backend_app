"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteShift = void 0;
class DeleteShift {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.delete(id);
    }
}
exports.DeleteShift = DeleteShift;
