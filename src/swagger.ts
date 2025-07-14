import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Nómina',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
  },
  apis: ['./src/Presentation/Routes/*.ts'],
}

const swaggerSpec = swaggerJsDoc(options)

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}