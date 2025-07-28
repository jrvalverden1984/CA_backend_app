import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMDepartmentRepository } from '../../Infrastructure/Repositories/TypeORMDepartmentRepository'
import { CreateDepartment } from '../../Application/Department/CreateDepartment'
import { GetDepartmentById } from '../../Application/Department/GetDepartmentById'
import { UpdateDepartment } from '../../Application/Department/UpdateDepartment'
import { DeleteDepartment } from '../../Application/Department/DeleteDepartment'
import { GetPaginatedDepartments } from '../../Application/Department/GetPaginatedDepartments'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMDepartmentRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - DepartmentController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createDepartmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.description || req.body.description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
    }

    const result = await new CreateDepartment(repo).execute(req.body.description)

    Logger.info('Department created successfully:', { DepartmentID: result.DepartmentID })
    return res.status(201).json(ApiResponse.created({ DepartmentID: result.DepartmentID }))
  } catch (error) {
    Logger.error('Error in createDepartmentHandler:', error)
    next(error)
  }
}

export const getDepartmentByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departmentId = +req.params.id
    
    if (isNaN(departmentId) || departmentId <= 0) {
      throw new BadRequestError('El ID del departamento debe ser un número válido mayor a 0')
    }

    const data = await new GetDepartmentById(repo).execute(departmentId)
    
    if (!data) {
      throw new NotFoundError('Departamento no encontrado')
    }

    Logger.info('Department found successfully:', { DepartmentID: data.DepartmentID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getDepartmentByIdHandler:', error)
    next(error)
  }
}

export const updateDepartmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departmentId = +req.params.id
    
    if (isNaN(departmentId) || departmentId <= 0) {
      throw new BadRequestError('El ID del departamento debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.description !== undefined && req.body.description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
    }

    const result = await new UpdateDepartment(repo).execute(departmentId, req.body.description)
    
    if (!result) {
      throw new NotFoundError('Departamento no encontrado')
    }

    Logger.info('Department updated successfully:', { DepartmentID: result.DepartmentID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateDepartmentHandler:', error)
    next(error)
  }
}

export const deleteDepartmentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const departmentId = +req.params.id
    
    if (isNaN(departmentId) || departmentId <= 0) {
      throw new BadRequestError('El ID del departamento debe ser un número válido mayor a 0')
    }

    // Verificar que el departamento existe antes de eliminarlo
    const existingDepartment = await new GetDepartmentById(repo).execute(departmentId)
    
    if (!existingDepartment) {
      throw new NotFoundError('Departamento no encontrado')
    }

    await new DeleteDepartment(repo).execute(departmentId)

    return res.status(204).json(ApiResponse.success(null, 'Departamento eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteDepartmentHandler:', error)
    next(error)
  }
}

export const getPaginatedDepartmentsHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedDepartments(repo).execute(page, limit)
    
    Logger.info('Departments found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedDepartmentsHandler:', error)
    next(error)
  }
}
