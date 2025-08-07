import { Request, Response, NextFunction } from 'express'
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMShiftRepository } from '../../Infrastructure/Repositories/TypeORMShiftRepository'
import { CreateShift } from '../../Application/Shift/CreateShift'
import { GetShiftById } from '../../Application/Shift/GetShiftById'
import { UpdateShift } from '../../Application/Shift/UpdateShift'
import { DeleteShift } from '../../Application/Shift/DeleteShift'
import { GetPaginatedShifts } from '../../Application/Shift/GetPaginatedShifts'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMShiftRepository()

// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - ShiftController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createShiftHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validar campos obligatorios
    if (!req.body.Name || req.body.Name.trim() === '') {
      throw new BadRequestError('El nombre es obligatorio')
    }

    if (!req.body.Description || req.body.Description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
    }

    if (!req.body.StartTime) {
      throw new BadRequestError('La hora de inicio es obligatoria')
    }

    if (!req.body.EndTime) {
      throw new BadRequestError('La hora de fin es obligatoria')
    }

    const result = await new CreateShift(repo).execute(req.body)

    Logger.info('Shift created successfully:', { ShiftID: result.ShiftID })
    return res.status(201).json(ApiResponse.created({ ShiftID: result.ShiftID }))
  } catch (error) {
    Logger.error('Error in createShiftHandler:', error)
    next(error)
  }
}

export const getShiftByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shiftId = +req.params.id
    
    if (isNaN(shiftId) || shiftId <= 0) {
      throw new BadRequestError('El ID del turno debe ser un número válido mayor a 0')
    }

    const data = await new GetShiftById(repo).execute(shiftId)
    
    if (!data) {
      throw new NotFoundError('Turno no encontrado')
    }

    Logger.info('Shift found successfully:', { ShiftID: data.ShiftID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getShiftByIdHandler:', error)
    next(error)
  }
}

export const updateShiftHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shiftId = +req.params.id
    
    if (isNaN(shiftId) || shiftId <= 0) {
      throw new BadRequestError('El ID del turno debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.Name !== undefined && req.body.Name.trim() === '') {
      throw new BadRequestError('El nombre no puede estar vacío')
    }

    if (req.body.Description !== undefined && req.body.Description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
    }

    if (req.body.StartTime !== undefined && !req.body.StartTime) {
      throw new BadRequestError('La hora de inicio no puede estar vacía')
    }

    if (req.body.EndTime !== undefined && !req.body.EndTime) {
      throw new BadRequestError('La hora de fin no puede estar vacía')
    }

    const result = await new UpdateShift(repo).execute(shiftId, req.body)
    
    if (!result) {
      throw new NotFoundError('Turno no encontrado')
    }

    Logger.info('Shift updated successfully:', { ShiftID: result.ShiftID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateShiftHandler:', error)
    next(error)
  }
}

export const deleteShiftHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shiftId = +req.params.id
    
    if (isNaN(shiftId) || shiftId <= 0) {
      throw new BadRequestError('El ID del turno debe ser un número válido mayor a 0')
    }

    // Verificar que el turno existe antes de eliminarlo
    const existingShift = await new GetShiftById(repo).execute(shiftId)
    
    if (!existingShift) {
      throw new NotFoundError('Turno no encontrado')
    }

    await new DeleteShift(repo).execute(shiftId)

    return res.status(204).json(ApiResponse.success(null, 'Turno eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteShiftHandler:', error)
    next(error)
  }
}

export const getPaginatedShiftsHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedShifts(repo).execute(page, limit)
    
    Logger.info('Shifts found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedShiftsHandler:', error)
    next(error)
  }
}
