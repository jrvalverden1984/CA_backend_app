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
exports.JobRoleEntity = void 0;
const typeorm_1 = require("typeorm");
let JobRoleEntity = class JobRoleEntity {
};
exports.JobRoleEntity = JobRoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'JobRoleID' }),
    __metadata("design:type", Number)
], JobRoleEntity.prototype, "JobRoleID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 180 }),
    __metadata("design:type", String)
], JobRoleEntity.prototype, "Description", void 0);
exports.JobRoleEntity = JobRoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'JobRole', schema: 'Payroll' })
], JobRoleEntity);
