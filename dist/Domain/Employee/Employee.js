"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(EmployeeID, IdentificationNumber, FirstName, LastName, DepartmentID, JobRoleID, CostCenterID, ScheduleID, HireDate, Overtime, Salary, IsActive, Photo // opcional
    ) {
        this.EmployeeID = EmployeeID;
        this.IdentificationNumber = IdentificationNumber;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.DepartmentID = DepartmentID;
        this.JobRoleID = JobRoleID;
        this.CostCenterID = CostCenterID;
        this.ScheduleID = ScheduleID;
        this.HireDate = HireDate;
        this.Overtime = Overtime;
        this.Salary = Salary;
        this.IsActive = IsActive;
        this.Photo = Photo;
    }
    fullName() {
        return `${this.FirstName} ${this.LastName}`;
    }
}
exports.Employee = Employee;
