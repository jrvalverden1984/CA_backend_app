"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMEmployeeRepository = void 0;
const data_source_1 = require("../Database/data-source");
const EmployeeEntity_1 = require("../Entities/EmployeeEntity");
const Employee_1 = require("../../Domain/Employee/Employee");
class TypeORMEmployeeRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(EmployeeEntity_1.EmployeeEntity);
    }
    toDomain(e) {
        return new Employee_1.Employee(e.EmployeeID, e.IdentificationNumber, e.FirstName, e.LastName, e.DepartmentID, e.JobRoleID, e.CostCenterID, e.ScheduleID, e.HireDate, e.Overtime, Number(e.Salary), e.IsActive, e.Photo);
    }
    async create(data) {
        const saved = await this.repo.save(this.repo.create(data));
        return this.toDomain(saved);
    }
    async getById(id) {
        const e = await this.repo.findOneBy({ EmployeeID: id });
        return e ? this.toDomain(e) : null;
    }
    async update(id, data) {
        const e = await this.repo.findOneBy({ EmployeeID: id });
        if (!e)
            return null;
        Object.assign(e, data);
        return this.toDomain(await this.repo.save(e));
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async getPaginated(page, limit) {
        const list = await this.repo.find({ skip: (page - 1) * limit, take: limit });
        return list.map(this.toDomain);
    }
}
exports.TypeORMEmployeeRepository = TypeORMEmployeeRepository;
