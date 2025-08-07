import { Request, Response, NextFunction } from 'express'
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMScheduleRepository } from '../../Infrastructure/Repositories/TypeORMScheduleRepository'
import { CreateSchedule } from '../../Application/Schedule/CreateSchedule'
import { GetScheduleById } from '../../Application/Schedule/GetScheduleById'
import { UpdateSchedule } from '../../Application/Schedule/UpdateSchedule'
import { DeleteSchedule } from '../../Application/Schedule/DeleteSchedule'
import { GetPaginatedSchedules } from '../../Application/Schedule/GetPaginatedSchedules'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMScheduleRepository()

// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - ScheduleController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new CreateSchedule(repo).execute(req.body)

    Logger.info('Schedule created successfully:', { ScheduleID: result.ScheduleID })
    return res.status(201).json(ApiResponse.created({ ScheduleID: result.ScheduleID }))
  } catch (error) {
    Logger.error('Error in createScheduleHandler:', error)
    next(error)
  }
}

export const getScheduleByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleId = +req.params.id
    
    if (isNaN(scheduleId) || scheduleId <= 0) {
      throw new BadRequestError('El ID del horario debe ser un número válido mayor a 0')
    }

    const data = await new GetScheduleById(repo).execute(scheduleId)
    
    if (!data) {
      throw new NotFoundError('Horario no encontrado')
    }

    Logger.info('Schedule found successfully:', { ScheduleID: data.ScheduleID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getScheduleByIdHandler:', error)
    next(error)
  }
}

export const updateScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleId = +req.params.id
    
    if (isNaN(scheduleId) || scheduleId <= 0) {
      throw new BadRequestError('El ID del horario debe ser un número válido mayor a 0')
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

    const result = await new UpdateSchedule(repo).execute(scheduleId, req.body)
    
    if (!result) {
      throw new NotFoundError('Horario no encontrado')
    }

    Logger.info('Schedule updated successfully:', { ScheduleID: result.ScheduleID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateScheduleHandler:', error)
    next(error)
  }
}

export const deleteScheduleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleId = +req.params.id
    
    if (isNaN(scheduleId) || scheduleId <= 0) {
      throw new BadRequestError('El ID del horario debe ser un número válido mayor a 0')
    }

    // Verificar que el horario existe antes de eliminarlo
    const existingSchedule = await new GetScheduleById(repo).execute(scheduleId)
    
    if (!existingSchedule) {
      throw new NotFoundError('Horario no encontrado')
    }

    await new DeleteSchedule(repo).execute(scheduleId)

    return res.status(204).json(ApiResponse.success(null, 'Horario eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteScheduleHandler:', error)
    next(error)
  }
}

export const getPaginatedSchedulesHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedSchedules(repo).execute(page, limit)
    
    Logger.info('Schedules found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedSchedulesHandler:', error)
    next(error)
  }
}
