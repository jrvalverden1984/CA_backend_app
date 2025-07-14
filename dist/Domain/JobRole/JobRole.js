"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRole = void 0;
class JobRole {
    constructor(JobRoleID, Description) {
        this.JobRoleID = JobRoleID;
        this.Description = Description;
    }
    updateDescription(newDescription) {
        if (!newDescription || newDescription.trim() === '') {
            throw new Error('Description cannot be empty');
        }
        this.Description = newDescription.trim();
    }
}
exports.JobRole = JobRole;
