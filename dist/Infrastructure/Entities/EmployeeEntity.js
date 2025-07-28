"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeEntity = void 0;
const typeorm_1 = require("typeorm");
const DepartmentEntity_1 = require("./DepartmentEntity");
const JobRoleEntity_1 = require("./JobRoleEntity");
const CostCenterEntity_1 = require("./CostCenterEntity");
const ScheduleEntity_1 = require("./ScheduleEntity");
let EmployeeEntity = class EmployeeEntity {
};
exports.EmployeeEntity = EmployeeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'EmployeeID' }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "EmployeeID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "IdentificationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 35 }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "FirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 35 }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "LastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "DepartmentID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "JobRoleID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "CostCenterID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "ScheduleID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "HireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmployeeEntity.prototype, "Overtime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 18, scale: 4 }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "Salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmployeeEntity.prototype, "IsActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', nullable: true }),
    __metadata("design:type", Object)
], EmployeeEntity.prototype, "Photo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DepartmentEntity_1.DepartmentEntity, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({
        name: 'DepartmentID',
        referencedColumnName: 'DepartmentID',
        foreignKeyConstraintName: 'FK_Employee_Department'
    }),
    __metadata("design:type", DepartmentEntity_1.DepartmentEntity)
], EmployeeEntity.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JobRoleEntity_1.JobRoleEntity, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({
        name: 'JobRoleID',
        referencedColumnName: 'JobRoleID',
        foreignKeyConstraintName: 'FK_Employee_JobRole'
    }),
    __metadata("design:type", JobRoleEntity_1.JobRoleEntity)
], EmployeeEntity.prototype, "jobRole", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CostCenterEntity_1.CostCenterEntity, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({
        name: 'CostCenterID',
        referencedColumnName: 'CostCenterID',
        foreignKeyConstraintName: 'FK_Employee_CostCenter'
    }),
    __metadata("design:type", CostCenterEntity_1.CostCenterEntity)
], EmployeeEntity.prototype, "costCenter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ScheduleEntity_1.ScheduleEntity, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({
        name: 'ScheduleID',
        referencedColumnName: 'ScheduleID',
        foreignKeyConstraintName: 'FK_Employee_Schedule'
    }),
    __metadata("design:type", ScheduleEntity_1.ScheduleEntity)
], EmployeeEntity.prototype, "schedule", void 0);
exports.EmployeeEntity = EmployeeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Employee', schema: 'Payroll' })
], EmployeeEntity);
//# sourceMappingURL=EmployeeEntity.js.map