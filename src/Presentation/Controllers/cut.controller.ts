import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMCutRepository } from '../../Infrastructure/Repositories/TypeORMCutRepository'
import { CreateCut } from '../../Application/Cut/CreateCut'
import { GetCutById } from '../../Application/Cut/GetCutById'
import { UpdateCut } from '../../Application/Cut/UpdateCut'
import { DeleteCut } from '../../Application/Cut/DeleteCut'
import { GetCutsPaginated } from '../../Application/Cut/GetCutsPaginated'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMCutRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - CutController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createCutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.Description || req.body.Description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
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

    const result = await new CreateCut(repo).execute(
      req.body.Description,
      startDate,
      endDate,
      req.body.IsModifiable || false
    )

    Logger.info('Cut created successfully:', { CutID: result.CutID })
    return res.status(201).json(ApiResponse.created({ CutID: result.CutID }))
  } catch (error) {
    Logger.error('Error in createCutHandler:', error)
    next(error)
  }
}

export const getCutByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cutId = +req.params.id
    
    if (isNaN(cutId) || cutId <= 0) {
      throw new BadRequestError('El ID del corte debe ser un número válido mayor a 0')
    }

    const data = await new GetCutById(repo).execute(cutId)
    
    if (!data) {
      throw new NotFoundError('Corte no encontrado')
    }

    Logger.info('Cut found successfully:', { CutID: data.CutID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getCutByIdHandler:', error)
    next(error)
  }
}

export const updateCutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cutId = +req.params.id
    
    if (isNaN(cutId) || cutId <= 0) {
      throw new BadRequestError('El ID del corte debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.Description !== undefined && req.body.Description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
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

    // Obtener el corte actual para usar valores por defecto si no se proporcionan
    const currentCut = await new GetCutById(repo).execute(cutId)
    if (!currentCut) {
      throw new NotFoundError('Corte no encontrado')
    }

    const result = await new UpdateCut(repo).execute(
      cutId,
      req.body.Description || currentCut.Description,
      req.body.StartDate ? new Date(req.body.StartDate) : currentCut.StartDate,
      req.body.EndDate ? new Date(req.body.EndDate) : currentCut.EndDate,
      req.body.IsModifiable !== undefined ? req.body.IsModifiable : currentCut.IsModifiable
    )
    
    if (!result) {
      throw new NotFoundError('Corte no encontrado')
    }

    Logger.info('Cut updated successfully:', { CutID: result.CutID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateCutHandler:', error)
    next(error)
  }
}

export const deleteCutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cutId = +req.params.id
    
    if (isNaN(cutId) || cutId <= 0) {
      throw new BadRequestError('El ID del corte debe ser un número válido mayor a 0')
    }

    // Verificar que el corte existe antes de eliminarlo
    const existingCut = await new GetCutById(repo).execute(cutId)
    
    if (!existingCut) {
      throw new NotFoundError('Corte no encontrado')
    }

    await new DeleteCut(repo).execute(cutId)

    return res.status(204).json(ApiResponse.success(null, 'Corte eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteCutHandler:', error)
    next(error)
  }
}

export const getCutsPaginatedHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetCutsPaginated(repo).execute(page, limit)
    
    Logger.info('Cuts found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getCutsPaginatedHandler:', error)
    next(error)
  }
}
