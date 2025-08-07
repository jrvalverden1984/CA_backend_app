import { Request, Response, NextFunction } from 'express'
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMEmployeeRepository } from '../../Infrastructure/Repositories/TypeORMEmployeeRepository'
import { CreateEmployee } from '../../Application/Employee/CreateEmployee'
import { GetEmployeeById } from '../../Application/Employee/GetEmployeeById'
import { UpdateEmployee } from '../../Application/Employee/UpdateEmployee'
import { DeleteEmployee } from '../../Application/Employee/DeleteEmployee'
import { GetPaginatedEmployees } from '../../Application/Employee/GetPaginatedEmployees'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMEmployeeRepository()

// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - EmployeeController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createEmployeeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validar campos obligatorios
    if (!req.body.FirstName || req.body.FirstName.trim() === '') {
      throw new BadRequestError('El nombre es obligatorio')
    }

    if (!req.body.LastName || req.body.LastName.trim() === '') {
      throw new BadRequestError('El apellido es obligatorio')
    }

    if (!req.body.Email || req.body.Email.trim() === '') {
      throw new BadRequestError('El email es obligatorio')
    }

    if (!req.body.Phone || req.body.Phone.trim() === '') {
      throw new BadRequestError('El teléfono es obligatorio')
    }

    if (!req.body.DepartmentID || req.body.DepartmentID <= 0) {
      throw new BadRequestError('El ID del departamento es obligatorio y debe ser mayor a 0')
    }

    if (!req.body.JobRoleID || req.body.JobRoleID <= 0) {
      throw new BadRequestError('El ID del puesto de trabajo es obligatorio y debe ser mayor a 0')
    }

    if (!req.body.CostCenterID || req.body.CostCenterID <= 0) {
      throw new BadRequestError('El ID del centro de costo es obligatorio y debe ser mayor a 0')
    }

    const result = await new CreateEmployee(repo).execute(req.body)

    Logger.info('Employee created successfully:', { EmployeeID: result.EmployeeID })
    return res.status(201).json(ApiResponse.created({ EmployeeID: result.EmployeeID }))
  } catch (error) {
    Logger.error('Error in createEmployeeHandler:', error)
    next(error)
  }
}

export const getEmployeeByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = +req.params.id
    
    if (isNaN(employeeId) || employeeId <= 0) {
      throw new BadRequestError('El ID del empleado debe ser un número válido mayor a 0')
    }

    const data = await new GetEmployeeById(repo).execute(employeeId)
    
    if (!data) {
      throw new NotFoundError('Empleado no encontrado')
    }

    Logger.info('Employee found successfully:', { EmployeeID: data.EmployeeID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getEmployeeByIdHandler:', error)
    next(error)
  }
}

export const updateEmployeeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = +req.params.id
    
    if (isNaN(employeeId) || employeeId <= 0) {
      throw new BadRequestError('El ID del empleado debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.FirstName !== undefined && req.body.FirstName.trim() === '') {
      throw new BadRequestError('El nombre no puede estar vacío')
    }

    if (req.body.LastName !== undefined && req.body.LastName.trim() === '') {
      throw new BadRequestError('El apellido no puede estar vacío')
    }

    if (req.body.Email !== undefined && req.body.Email.trim() === '') {
      throw new BadRequestError('El email no puede estar vacío')
    }

    if (req.body.Phone !== undefined && req.body.Phone.trim() === '') {
      throw new BadRequestError('El teléfono no puede estar vacío')
    }

    if (req.body.DepartmentID !== undefined && req.body.DepartmentID <= 0) {
      throw new BadRequestError('El ID del departamento debe ser mayor a 0')
    }

    if (req.body.JobRoleID !== undefined && req.body.JobRoleID <= 0) {
      throw new BadRequestError('El ID del puesto de trabajo debe ser mayor a 0')
    }

    if (req.body.CostCenterID !== undefined && req.body.CostCenterID <= 0) {
      throw new BadRequestError('El ID del centro de costo debe ser mayor a 0')
    }

    const result = await new UpdateEmployee(repo).execute(employeeId, req.body)
    
    if (!result) {
      throw new NotFoundError('Empleado no encontrado')
    }

    Logger.info('Employee updated successfully:', { EmployeeID: result.EmployeeID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateEmployeeHandler:', error)
    next(error)
  }
}

export const deleteEmployeeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeId = +req.params.id
    
    if (isNaN(employeeId) || employeeId <= 0) {
      throw new BadRequestError('El ID del empleado debe ser un número válido mayor a 0')
    }

    // Verificar que el empleado existe antes de eliminarlo
    const existingEmployee = await new GetEmployeeById(repo).execute(employeeId)
    
    if (!existingEmployee) {
      throw new NotFoundError('Empleado no encontrado')
    }

    await new DeleteEmployee(repo).execute(employeeId)

    return res.status(204).json(ApiResponse.success(null, 'Empleado eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteEmployeeHandler:', error)
    next(error)
  }
}

export const getPaginatedEmployeesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    
    // Validar parámetros de paginación
    if (page <= 0) {
      throw new BadRequestError('El número de página debe ser mayor a 0')
    }
    
    if (limit <= 0 || limit > 100) {
      throw new BadRequestError('El límite debe estar entre 1 y 100')
    }

    const result = await new GetPaginatedEmployees(repo).execute(page, limit)
    
    Logger.info('Employees found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedEmployeesHandler:', error)
    next(error)
  }
}
