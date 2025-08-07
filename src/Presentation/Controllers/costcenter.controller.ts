import { Request, Response, NextFunction } from 'express'
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMCostCenterRepository } from '../../Infrastructure/Repositories/TypeORMCostCenterRepository'
import { CreateCostCenter } from '../../Application/CostCenter/CreateCostCenter'
import { GetCostCenterById } from '../../Application/CostCenter/GetCostCenterById'
import { UpdateCostCenter } from '../../Application/CostCenter/UpdateCostCenter'
import { DeleteCostCenter } from '../../Application/CostCenter/DeleteCostCenter'
import { GetPaginatedCostCenters } from '../../Application/CostCenter/GetPaginatedCostCenters'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMCostCenterRepository()

// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - CostCenterController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createCostCenterHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.description || req.body.description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
    }

    const result = await new CreateCostCenter(repo).execute(req.body.description)

    Logger.info('CostCenter created successfully:', { CostCenterID: result.CostCenterID })
    return res.status(201).json(ApiResponse.created({ CostCenterID: result.CostCenterID }))
  } catch (error) {
    Logger.error('Error in createCostCenterHandler:', error)
    next(error)
  }
}

export const getCostCenterByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const costCenterId = +req.params.id
    
    if (isNaN(costCenterId) || costCenterId <= 0) {
      throw new BadRequestError('El ID del centro de costo debe ser un número válido mayor a 0')
    }

    const data = await new GetCostCenterById(repo).execute(costCenterId)
    
    if (!data) {
      throw new NotFoundError('Centro de costo no encontrado')
    }

    Logger.info('CostCenter found successfully:', { CostCenterID: data.CostCenterID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getCostCenterByIdHandler:', error)
    next(error)
  }
}

export const updateCostCenterHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const costCenterId = +req.params.id
    
    if (isNaN(costCenterId) || costCenterId <= 0) {
      throw new BadRequestError('El ID del centro de costo debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.description !== undefined && req.body.description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
    }

    const result = await new UpdateCostCenter(repo).execute(costCenterId, req.body.description)
    
    if (!result) {
      throw new NotFoundError('Centro de costo no encontrado')
    }

    Logger.info('CostCenter updated successfully:', { CostCenterID: result.CostCenterID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateCostCenterHandler:', error)
    next(error)
  }
}

export const deleteCostCenterHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const costCenterId = +req.params.id
    
    if (isNaN(costCenterId) || costCenterId <= 0) {
      throw new BadRequestError('El ID del centro de costo debe ser un número válido mayor a 0')
    }

    // Verificar que el centro de costo existe antes de eliminarlo
    const existingCostCenter = await new GetCostCenterById(repo).execute(costCenterId)
    
    if (!existingCostCenter) {
      throw new NotFoundError('Centro de costo no encontrado')
    }

    await new DeleteCostCenter(repo).execute(costCenterId)

    return res.status(204).json(ApiResponse.success(null, 'Centro de costo eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteCostCenterHandler:', error)
    next(error)
  }
}

export const getPaginatedCostCentersHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedCostCenters(repo).execute(page, limit)
    
    Logger.info('CostCenters found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedCostCentersHandler:', error)
    next(error)
  }
}
