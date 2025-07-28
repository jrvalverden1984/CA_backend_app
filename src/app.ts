import express from 'express'
import { setupSwagger } from './Swagger/swagger'
import { errorMiddleware } from './Shared/Middleware/error.middleware'
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
//import authRoutes from './Presentation/Routes/auth.routes'

const app = express()

app.use(express.json())
app.use('/company', companyRoutes)
app.use('/costcenter', costcenterRoutes)
app.use('/cut', cutRoutes)
app.use('/department', departmentRoutes)
app.use('/employee', employeeRoutes)
app.use('/holiday', holidayRoutes)
app.use('/jobrole', jobroleRoutes)
app.use('/motivepermit', motivepermitRoutes)
app.use('/schedule', scheduleRoutes)
app.use('/scheduleshift', scheduleshiftRoutes)
app.use('/shift', shiftRoutes)
app.use('/user', userRoutes)
app.use('/workpermit', workpermitRoutes)
//app.use('/auth', authRoutes)
app.use(errorMiddleware)

setupSwagger(app)

export default app
