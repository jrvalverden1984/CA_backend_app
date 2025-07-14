import express from 'express'
//import userRoutes from './Presentation/Routes/user.routes'
import { setupSwagger } from './swagger'

const app = express()

app.use(express.json())
//app.use('/api/users', userRoutes)
setupSwagger(app)

export default app
