"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetShiftById = void 0;
class GetShiftById {
    constructor(repo) {
        this.repo = repo;
    }
    execute(id) {
        return this.repo.getById(id);
    }
}
exports.GetShiftById = GetShiftById;
