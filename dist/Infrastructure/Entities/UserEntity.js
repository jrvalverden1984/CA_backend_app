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
exports.UserEntity = void 0;
const CompanyEntity_1 = require("./CompanyEntity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'UserID' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "UserID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CompanyID', type: 'int' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "CompanyID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Login', type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], UserEntity.prototype, "Login", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FirstName', type: 'varchar', length: 35 }),
    __metadata("design:type", String)
], UserEntity.prototype, "FirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LastName', type: 'varchar', length: 35 }),
    __metadata("design:type", String)
], UserEntity.prototype, "LastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Password', type: 'text' }),
    __metadata("design:type", String)
], UserEntity.prototype, "Password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ExpirationDate', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "ExpirationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Metadata', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "Metadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CompanyEntity_1.CompanyEntity, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({
        name: 'CompanyID',
        referencedColumnName: 'CompanyID',
        foreignKeyConstraintName: 'FK_User_Company'
    }),
    __metadata("design:type", CompanyEntity_1.CompanyEntity)
], UserEntity.prototype, "company", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('User', { schema: 'Security' })
], UserEntity);
//# sourceMappingURL=UserEntity.js.map