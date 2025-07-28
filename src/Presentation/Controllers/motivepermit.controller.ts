import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMMotivePermitRepository } from '../../Infrastructure/Repositories/TypeORMMotivePermitRepository'
import { CreateMotivePermit } from '../../Application/MotivePermit/CreateMotivePermit'
import { GetMotivePermitById } from '../../Application/MotivePermit/GetMotivePermitById'
import { UpdateMotivePermit } from '../../Application/MotivePermit/UpdateMotivePermit'
import { DeleteMotivePermit } from '../../Application/MotivePermit/DeleteMotivePermit'
import { GetPaginatedMotivePermits } from '../../Application/MotivePermit/GetPaginatedMotivePermits'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMMotivePermitRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - MotivePermitController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createMotivePermitHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.Description || req.body.Description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
    }

    const result = await new CreateMotivePermit(repo).execute(req.body.Description)

    Logger.info('MotivePermit created successfully:', { MotivePermitID: result.MotivePermitID })
    return res.status(201).json(ApiResponse.created({ MotivePermitID: result.MotivePermitID }))
  } catch (error) {
    Logger.error('Error in createMotivePermitHandler:', error)
    next(error)
  }
}

export const getMotivePermitByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const motivePermitId = +req.params.id
    
    if (isNaN(motivePermitId) || motivePermitId <= 0) {
      throw new BadRequestError('El ID del motivo de permiso debe ser un número válido mayor a 0')
    }

    const data = await new GetMotivePermitById(repo).execute(motivePermitId)
    
    if (!data) {
      throw new NotFoundError('Motivo de permiso no encontrado')
    }

    Logger.info('MotivePermit found successfully:', { MotivePermitID: data.MotivePermitID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getMotivePermitByIdHandler:', error)
    next(error)
  }
}

export const updateMotivePermitHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const motivePermitId = +req.params.id
    
    if (isNaN(motivePermitId) || motivePermitId <= 0) {
      throw new BadRequestError('El ID del motivo de permiso debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.Description !== undefined && req.body.Description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
    }

    const result = await new UpdateMotivePermit(repo).execute(motivePermitId, req.body.Description)
    
    if (!result) {
      throw new NotFoundError('Motivo de permiso no encontrado')
    }

    Logger.info('MotivePermit updated successfully:', { MotivePermitID: result.MotivePermitID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateMotivePermitHandler:', error)
    next(error)
  }
}

export const deleteMotivePermitHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const motivePermitId = +req.params.id
    
    if (isNaN(motivePermitId) || motivePermitId <= 0) {
      throw new BadRequestError('El ID del motivo de permiso debe ser un número válido mayor a 0')
    }

    // Verificar que el motivo de permiso existe antes de eliminarlo
    const existingMotivePermit = await new GetMotivePermitById(repo).execute(motivePermitId)
    
    if (!existingMotivePermit) {
      throw new NotFoundError('Motivo de permiso no encontrado')
    }

    await new DeleteMotivePermit(repo).execute(motivePermitId)

    return res.status(204).json(ApiResponse.success(null, 'Motivo de permiso eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteMotivePermitHandler:', error)
    next(error)
  }
}

export const getPaginatedMotivePermitsHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedMotivePermits(repo).execute(page, limit)
    
    Logger.info('MotivePermits found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedMotivePermitsHandler:', error)
    next(error)
  }
}
