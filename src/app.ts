import express from 'express'
import { setupSwagger } from './Swagger/swagger'
import { errorMiddleware } from './Shared/Middleware/error.middleware'
import { corsMiddleware } from './Shared/Middleware/cors.middleware'
//import { MainDataSource } from './Infrastructure/Database/main.datasource';
import { tenantMiddleware } from './Shared/Middleware/tenant.middleware';
import companyRoutes from './Presentation/Routes/company.routes'
import userRoutes from './Presentation/Routes/user.routes'
import jobroleRoutes from './Presentation/Routes/jobrole.routes'
import shiftRoutes from './Presentation/Routes/shift.routes'
import costcenterRoutes from './Presentation/Routes/costcenter.routes'
import workpermitRoutes from './Presentation/Routes/workpermit.routes'
import holidayRoutes from './Presentation/Routes/holiday.routes'
import employeeRoutes from './Presentation/Routes/employee.routes'
import departmentRoutes from './Presentation/Routes/department.routes'
import motivepermitRoutes from './Presentation/Routes/motivepermit.routes'
import scheduleshiftRoutes from './Presentation/Routes/scheduleshift.routes'
import scheduleRoutes from './Presentation/Routes/schedule.routes'
import cutRoutes from './Presentation/Routes/cut.routes'
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
  
const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use('/company', tenantMiddleware, companyRoutes)
app.use('/costcenter', tenantMiddleware, costcenterRoutes)
app.use('/cut', tenantMiddleware, cutRoutes)
app.use('/department', tenantMiddleware, departmentRoutes)
app.use('/employee', tenantMiddleware, employeeRoutes)
app.use('/holiday', tenantMiddleware, holidayRoutes)
app.use('/jobrole', tenantMiddleware, jobroleRoutes)
app.use('/motivepermit', tenantMiddleware, motivepermitRoutes)
app.use('/schedule', tenantMiddleware, scheduleRoutes)
app.use('/scheduleshift', tenantMiddleware, scheduleshiftRoutes)
app.use('/shift', tenantMiddleware, shiftRoutes)
app.use('/user', tenantMiddleware, userRoutes)
app.use('/workpermit', workpermitRoutes)
//app.use('/auth', authRoutes)
app.use(errorMiddleware)

setupSwagger(app)

export default app
