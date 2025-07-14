"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedEmployeesHandler = exports.deleteEmployeeHandler = exports.updateEmployeeHandler = exports.getEmployeeByIdHandler = exports.createEmployeeHandler = void 0;
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMEmployeeRepository_1 = require("../../Infrastructure/Repositories/TypeORMEmployeeRepository");
const CreateEmployee_1 = require("../../Application/Employee/CreateEmployee");
const GetEmployeeById_1 = require("../../Application/Employee/GetEmployeeById");
const UpdateEmployee_1 = require("../../Application/Employee/UpdateEmployee");
const DeleteEmployee_1 = require("../../Application/Employee/DeleteEmployee");
const GetPaginatedEmployees_1 = require("../../Application/Employee/GetPaginatedEmployees");
const repo = new TypeORMEmployeeRepository_1.TypeORMEmployeeRepository();
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createEmployeeHandler = async (req, res) => {
    const result = await new CreateEmployee_1.CreateEmployee(repo).execute(req.body);
    res.status(201).json(result);
};
exports.createEmployeeHandler = createEmployeeHandler;
const getEmployeeByIdHandler = async (req, res) => {
    const data = await new GetEmployeeById_1.GetEmployeeById(repo).execute(+req.params.id);
    data ? res.json(data) : res.status(404).send();
};
exports.getEmployeeByIdHandler = getEmployeeByIdHandler;
const updateEmployeeHandler = async (req, res) => {
    const result = await new UpdateEmployee_1.UpdateEmployee(repo).execute(+req.params.id, req.body);
    res.json(result);
};
exports.updateEmployeeHandler = updateEmployeeHandler;
const deleteEmployeeHandler = async (req, res) => {
    await new DeleteEmployee_1.DeleteEmployee(repo).execute(+req.params.id);
    res.status(204).send();
};
exports.deleteEmployeeHandler = deleteEmployeeHandler;
const getPaginatedEmployeesHandler = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    res.json(await new GetPaginatedEmployees_1.GetPaginatedEmployees(repo).execute(page, limit));
};
exports.getPaginatedEmployeesHandler = getPaginatedEmployeesHandler;
