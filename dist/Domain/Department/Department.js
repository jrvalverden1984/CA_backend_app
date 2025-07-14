"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
class Department {
    constructor(DepartmentID, Description) {
        this.DepartmentID = DepartmentID;
        this.Description = Description;
    }
    // Puedes agregar lógica de dominio aquí
    updateDescription(newDescription) {
        if (!newDescription || newDescription.trim() === '') {
            throw new Error('Description cannot be empty');
        }
        this.Description = newDescription.trim();
    }
}
exports.Department = Department;
