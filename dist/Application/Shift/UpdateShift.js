"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShift = void 0;
class UpdateShift {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id, data) {
        return this.repo.update(id, data);
    }
}
exports.UpdateShift = UpdateShift;
