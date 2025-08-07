"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./Swagger/swagger");
const error_middleware_1 = require("./Shared/Middleware/error.middleware");
const cors_middleware_1 = require("./Shared/Middleware/cors.middleware");
//import { MainDataSource } from './Infrastructure/Database/main.datasource';
const tenant_middleware_1 = require("./Shared/Middleware/tenant.middleware");
const company_routes_1 = __importDefault(require("./Presentation/Routes/company.routes"));
const user_routes_1 = __importDefault(require("./Presentation/Routes/user.routes"));
const jobrole_routes_1 = __importDefault(require("./Presentation/Routes/jobrole.routes"));
const shift_routes_1 = __importDefault(require("./Presentation/Routes/shift.routes"));
const costcenter_routes_1 = __importDefault(require("./Presentation/Routes/costcenter.routes"));
const workpermit_routes_1 = __importDefault(require("./Presentation/Routes/workpermit.routes"));
const holiday_routes_1 = __importDefault(require("./Presentation/Routes/holiday.routes"));
const employee_routes_1 = __importDefault(require("./Presentation/Routes/employee.routes"));
const department_routes_1 = __importDefault(require("./Presentation/Routes/department.routes"));
const motivepermit_routes_1 = __importDefault(require("./Presentation/Routes/motivepermit.routes"));
const scheduleshift_routes_1 = __importDefault(require("./Presentation/Routes/scheduleshift.routes"));
const schedule_routes_1 = __importDefault(require("./Presentation/Routes/schedule.routes"));
const cut_routes_1 = __importDefault(require("./Presentation/Routes/cut.routes"));
// import { AppDataSource } from './Infrastructure/Database/data-source';
// import { Logger } from './Shared/Utils/Logger';
//import authRoutes from './Presentation/Routes/auth.routes'
// MainDataSource.initialize().then(() => {
//   console.log('Connected to database')
// }).catch((error) => {
//   console.error('Error connecting to database', error)
// })
// AppDataSource.initialize().then(() => {
//     Logger.info('📦 TypeORM connected to PostgreSQL - App')
//   }).catch((error) => Logger.error('Error connecting to TypeORM:', error))
const app = (0, express_1.default)();
app.use(cors_middleware_1.corsMiddleware);
app.use(express_1.default.json());
app.use('/company', tenant_middleware_1.tenantMiddleware, company_routes_1.default);
app.use('/costcenter', tenant_middleware_1.tenantMiddleware, costcenter_routes_1.default);
app.use('/cut', tenant_middleware_1.tenantMiddleware, cut_routes_1.default);
app.use('/department', tenant_middleware_1.tenantMiddleware, department_routes_1.default);
app.use('/employee', tenant_middleware_1.tenantMiddleware, employee_routes_1.default);
app.use('/holiday', tenant_middleware_1.tenantMiddleware, holiday_routes_1.default);
app.use('/jobrole', tenant_middleware_1.tenantMiddleware, jobrole_routes_1.default);
app.use('/motivepermit', tenant_middleware_1.tenantMiddleware, motivepermit_routes_1.default);
app.use('/schedule', tenant_middleware_1.tenantMiddleware, schedule_routes_1.default);
app.use('/scheduleshift', tenant_middleware_1.tenantMiddleware, scheduleshift_routes_1.default);
app.use('/shift', tenant_middleware_1.tenantMiddleware, shift_routes_1.default);
app.use('/user', tenant_middleware_1.tenantMiddleware, user_routes_1.default);
app.use('/workpermit', workpermit_routes_1.default);
//app.use('/auth', authRoutes)
app.use(error_middleware_1.errorMiddleware);
(0, swagger_1.setupSwagger)(app);
exports.default = app;
//# sourceMappingURL=app.js.map