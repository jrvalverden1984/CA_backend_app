"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignShiftsToSchedule = void 0;
class AssignShiftsToSchedule {
    constructor(repo) {
        this.repo = repo;
    }
    execute(scheduleID, shiftIDs) {
        // shiftIDs: lista de IDs de Shift que se deben asociar
        return this.repo.upsertManyForSchedule(scheduleID, shiftIDs);
    }
}
exports.AssignShiftsToSchedule = AssignShiftsToSchedule;
