"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./Swagger/swagger");
const error_middleware_1 = require("./Shared/Middleware/error.middleware");
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
//import authRoutes from './Presentation/Routes/auth.routes'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/company', company_routes_1.default);
app.use('/costcenter', costcenter_routes_1.default);
app.use('/cut', cut_routes_1.default);
app.use('/department', department_routes_1.default);
app.use('/employee', employee_routes_1.default);
app.use('/holiday', holiday_routes_1.default);
app.use('/jobrole', jobrole_routes_1.default);
app.use('/motivepermit', motivepermit_routes_1.default);
app.use('/schedule', schedule_routes_1.default);
app.use('/scheduleshift', scheduleshift_routes_1.default);
app.use('/shift', shift_routes_1.default);
app.use('/user', user_routes_1.default);
app.use('/workpermit', workpermit_routes_1.default);
//app.use('/auth', authRoutes)
app.use(error_middleware_1.errorMiddleware);
(0, swagger_1.setupSwagger)(app);
exports.default = app;
//# sourceMappingURL=app.js.map