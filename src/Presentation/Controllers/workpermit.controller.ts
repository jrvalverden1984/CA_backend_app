import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMWorkPermitRepository } from '../../Infrastructure/Repositories/TypeORMWorkPermitRepository'
import { CreateWorkPermit } from '../../Application/WorkPermit/CreateWorkPermit'
import { DeleteWorkPermit } from '../../Application/WorkPermit/DeleteWorkPermit'
import { GetPaginatedWorkPermits } from '../../Application/WorkPermit/GetPaginatedWorkPermits'
import { GetWorkPermitById } from '../../Application/WorkPermit/GetWorkPermitById'
import { UpdateWorkPermit } from '../../Application/WorkPermit/UpdateWorkPermit'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMWorkPermitRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - WorkPermitController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createWorkPermitHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validar campos obligatorios
    if (!req.body.EmployeeID || req.body.EmployeeID <= 0) {
      throw new BadRequestError('El ID del empleado es obligatorio y debe ser mayor a 0')
    }

    if (!req.body.MotivePermitID || req.body.MotivePermitID <= 0) {
      throw new BadRequestError('El ID del motivo de permiso es obligatorio y debe ser mayor a 0')
    }

    if (!req.body.StartDate) {
      throw new BadRequestError('La fecha de inicio es obligatoria')
    }

    if (!req.body.EndDate) {
      throw new BadRequestError('La fecha de fin es obligatoria')
    }

    const startDate = new Date(req.body.StartDate)
    const endDate = new Date(req.body.EndDate)

    if (isNaN(startDate.getTime())) {
      throw new BadRequestError('La fecha de inicio debe ser una fecha válida')
    }

    if (isNaN(endDate.getTime())) {
      throw new BadRequestError('La fecha de fin debe ser una fecha válida')
    }

    if (startDate >= endDate) {
      throw new BadRequestError('La fecha de inicio debe ser anterior a la fecha de fin')
    }

    const result = await new CreateWorkPermit(repo).execute(req.body)

    Logger.info('WorkPermit created successfully:', { WorkPermitID: result.WorkPermitID })
    return res.status(201).json(ApiResponse.created({ WorkPermitID: result.WorkPermitID }))
  } catch (error) {
    Logger.error('Error in createWorkPermitHandler:', error)
    next(error)
  }
}

export const getWorkPermitByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workPermitId = +req.params.id
    
    if (isNaN(workPermitId) || workPermitId <= 0) {
      throw new BadRequestError('El ID del permiso de trabajo debe ser un número válido mayor a 0')
    }

    const data = await new GetWorkPermitById(repo).execute(workPermitId)
    
    if (!data) {
      throw new NotFoundError('Permiso de trabajo no encontrado')
    }

    Logger.info('WorkPermit found successfully:', { WorkPermitID: data.WorkPermitID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getWorkPermitByIdHandler:', error)
    next(error)
  }
}

export const updateWorkPermitHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workPermitId = +req.params.id
    
    if (isNaN(workPermitId) || workPermitId <= 0) {
      throw new BadRequestError('El ID del permiso de trabajo debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.EmployeeID !== undefined && req.body.EmployeeID <= 0) {
      throw new BadRequestError('El ID del empleado debe ser mayor a 0')
    }

    if (req.body.MotivePermitID !== undefined && req.body.MotivePermitID <= 0) {
      throw new BadRequestError('El ID del motivo de permiso debe ser mayor a 0')
    }

    if (req.body.StartDate !== undefined) {
      const startDate = new Date(req.body.StartDate)
      if (isNaN(startDate.getTime())) {
        throw new BadRequestError('La fecha de inicio debe ser una fecha válida')
      }
    }

    if (req.body.EndDate !== undefined) {
      const endDate = new Date(req.body.EndDate)
      if (isNaN(endDate.getTime())) {
        throw new BadRequestError('La fecha de fin debe ser una fecha válida')
      }
    }

    // Validar que las fechas sean coherentes si ambas están presentes
    if (req.body.StartDate && req.body.EndDate) {
      const startDate = new Date(req.body.StartDate)
      const endDate = new Date(req.body.EndDate)
      if (startDate >= endDate) {
        throw new BadRequestError('La fecha de inicio debe ser anterior a la fecha de fin')
      }
    }

    const result = await new UpdateWorkPermit(repo).execute(workPermitId, req.body)
    
    if (!result) {
      throw new NotFoundError('Permiso de trabajo no encontrado')
    }

    Logger.info('WorkPermit updated successfully:', { WorkPermitID: result.WorkPermitID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateWorkPermitHandler:', error)
    next(error)
  }
}

export const deleteWorkPermitHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workPermitId = +req.params.id
    
    if (isNaN(workPermitId) || workPermitId <= 0) {
      throw new BadRequestError('El ID del permiso de trabajo debe ser un número válido mayor a 0')
    }

    // Verificar que el permiso de trabajo existe antes de eliminarlo
    const existingWorkPermit = await new GetWorkPermitById(repo).execute(workPermitId)
    
    if (!existingWorkPermit) {
      throw new NotFoundError('Permiso de trabajo no encontrado')
    }

    await new DeleteWorkPermit(repo).execute(workPermitId)

    return res.status(204).json(ApiResponse.success(null, 'Permiso de trabajo eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteWorkPermitHandler:', error)
    next(error)
  }
}

export const getPaginatedWorkPermitsHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedWorkPermits(repo).execute(page, limit)
    
    Logger.info('WorkPermits found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedWorkPermitsHandler:', error)
    next(error)
  }
}
