import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMScheduleShiftRepository } from '../../Infrastructure/Repositories/TypeORMScheduleShiftRepository'
import { CreateScheduleShift } from '../../Application/ScheduleShift/CreateScheduleShift'
import { GetScheduleShiftById } from '../../Application/ScheduleShift/GetScheduleShiftById'
import { UpdateScheduleShift } from '../../Application/ScheduleShift/UpdateScheduleShift'
import { DeleteScheduleShift } from '../../Application/ScheduleShift/DeleteScheduleShift'
import { GetPaginatedScheduleShifts } from '../../Application/ScheduleShift/GetPaginatedScheduleShifts'
import { AssignShiftsToSchedule } from '../../Application/ScheduleShift/AssignShiftsToSchedule'
import { GetShiftsBySchedule } from '../../Application/ScheduleShift/GetShiftsBySchedule'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMScheduleShiftRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - ScheduleShiftController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createScheduleShiftHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.scheduleID || req.body.scheduleID <= 0) {
      throw new BadRequestError('El ID del horario es obligatorio y debe ser mayor a 0')
    }

    if (!req.body.shiftID || req.body.shiftID <= 0) {
      throw new BadRequestError('El ID del turno es obligatorio y debe ser mayor a 0')
    }

    const result = await new CreateScheduleShift(repo).execute(req.body.scheduleID, req.body.shiftID)

    Logger.info('ScheduleShift created successfully:', { ScheduleShiftID: result.ScheduleShiftID })
    return res.status(201).json(ApiResponse.created({ ScheduleShiftID: result.ScheduleShiftID }))
  } catch (error) {
    Logger.error('Error in createScheduleShiftHandler:', error)
    next(error)
  }
}

export const getScheduleShiftByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleShiftId = +req.params.id
    
    if (isNaN(scheduleShiftId) || scheduleShiftId <= 0) {
      throw new BadRequestError('El ID del horario-turno debe ser un número válido mayor a 0')
    }

    const data = await new GetScheduleShiftById(repo).execute(scheduleShiftId)
    
    if (!data) {
      throw new NotFoundError('Horario-turno no encontrado')
    }

    Logger.info('ScheduleShift found successfully:', { ScheduleShiftID: data.ScheduleShiftID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getScheduleShiftByIdHandler:', error)
    next(error)
  }
}

export const updateScheduleShiftHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleShiftId = +req.params.id
    
    if (isNaN(scheduleShiftId) || scheduleShiftId <= 0) {
      throw new BadRequestError('El ID del horario-turno debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.scheduleID !== undefined && req.body.scheduleID <= 0) {
      throw new BadRequestError('El ID del horario debe ser mayor a 0')
    }

    if (req.body.shiftID !== undefined && req.body.shiftID <= 0) {
      throw new BadRequestError('El ID del turno debe ser mayor a 0')
    }

    const result = await new UpdateScheduleShift(repo).execute(scheduleShiftId, req.body.scheduleID, req.body.shiftID)
    
    if (!result) {
      throw new NotFoundError('Horario-turno no encontrado')
    }

    Logger.info('ScheduleShift updated successfully:', { ScheduleShiftID: result.ScheduleShiftID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateScheduleShiftHandler:', error)
    next(error)
  }
}

export const deleteScheduleShiftHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleShiftId = +req.params.id
    
    if (isNaN(scheduleShiftId) || scheduleShiftId <= 0) {
      throw new BadRequestError('El ID del horario-turno debe ser un número válido mayor a 0')
    }

    // Verificar que el horario-turno existe antes de eliminarlo
    const existingScheduleShift = await new GetScheduleShiftById(repo).execute(scheduleShiftId)
    
    if (!existingScheduleShift) {
      throw new NotFoundError('Horario-turno no encontrado')
    }

    await new DeleteScheduleShift(repo).execute(scheduleShiftId)

    return res.status(204).json(ApiResponse.success(null, 'Horario-turno eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteScheduleShiftHandler:', error)
    next(error)
  }
}

export const getPaginatedScheduleShiftsHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedScheduleShifts(repo).execute(page, limit)
    
    Logger.info('ScheduleShifts found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedScheduleShiftsHandler:', error)
    next(error)
  }
}

export const assignShiftsToScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.scheduleID || req.body.scheduleID <= 0) {
      throw new BadRequestError('El ID del horario es obligatorio y debe ser mayor a 0')
    }

    if (!req.body.shiftIDs || !Array.isArray(req.body.shiftIDs) || req.body.shiftIDs.length === 0) {
      throw new BadRequestError('Los IDs de los turnos son obligatorios y deben ser un array no vacío')
    }

    // Validar que todos los IDs de turnos sean válidos
    for (const shiftID of req.body.shiftIDs) {
      if (!shiftID || shiftID <= 0) {
        throw new BadRequestError('Todos los IDs de turnos deben ser mayores a 0')
      }
    }

    const result = await new AssignShiftsToSchedule(repo).execute(req.body.scheduleID, req.body.shiftIDs)

    Logger.info('Shifts assigned to schedule successfully:', { ScheduleID: req.body.scheduleID, ShiftsCount: req.body.shiftIDs.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in assignShiftsToScheduleHandler:', error)
    next(error)
  }
}

export const getShiftsByScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleId = +req.params.scheduleID
    
    if (isNaN(scheduleId) || scheduleId <= 0) {
      throw new BadRequestError('El ID del horario debe ser un número válido mayor a 0')
    }

    const result = await new GetShiftsBySchedule(repo).execute(scheduleId)

    Logger.info('Shifts found for schedule successfully:', { ScheduleID: scheduleId, ShiftsCount: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getShiftsByScheduleHandler:', error)
    next(error)
  }
}