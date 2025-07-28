import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMHolidayRepository } from '../../Infrastructure/Repositories/TypeORMHolidayRepository'
import { CreateHoliday } from '../../Application/Holiday/CreateHoliday'
import { GetHolidayById } from '../../Application/Holiday/GetHolidayById'
import { UpdateHoliday } from '../../Application/Holiday/UpdateHoliday'
import { DeleteHoliday } from '../../Application/Holiday/DeleteHoliday'
import { GetPaginatedHolidays } from '../../Application/Holiday/GetPaginatedHolidays'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMHolidayRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - HolidayController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createHolidayHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.description || req.body.description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
    }

    if (!req.body.startDate) {
      throw new BadRequestError('La fecha de inicio es obligatoria')
    }

    const startDate = new Date(req.body.startDate)

    if (isNaN(startDate.getTime())) {
      throw new BadRequestError('La fecha de inicio debe ser una fecha válida')
    }

    const result = await new CreateHoliday(repo).execute(req.body.description, startDate)

    Logger.info('Holiday created successfully:', { HolidayID: result.HolidayID })
    return res.status(201).json(ApiResponse.created({ HolidayID: result.HolidayID }))
  } catch (error) {
    Logger.error('Error in createHolidayHandler:', error)
    next(error)
  }
}

export const getHolidayByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const holidayId = +req.params.id
    
    if (isNaN(holidayId) || holidayId <= 0) {
      throw new BadRequestError('El ID del feriado debe ser un número válido mayor a 0')
    }

    const data = await new GetHolidayById(repo).execute(holidayId)
    
    if (!data) {
      throw new NotFoundError('Feriado no encontrado')
    }

    Logger.info('Holiday found successfully:', { HolidayID: data.HolidayID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getHolidayByIdHandler:', error)
    next(error)
  }
}

export const updateHolidayHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const holidayId = +req.params.id
    
    if (isNaN(holidayId) || holidayId <= 0) {
      throw new BadRequestError('El ID del feriado debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.description !== undefined && req.body.description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
    }

    if (req.body.startDate !== undefined) {
      const startDate = new Date(req.body.startDate)
      if (isNaN(startDate.getTime())) {
        throw new BadRequestError('La fecha de inicio debe ser una fecha válida')
      }
    }

    // Obtener el feriado actual para usar valores por defecto si no se proporcionan
    const currentHoliday = await new GetHolidayById(repo).execute(holidayId)
    if (!currentHoliday) {
      throw new NotFoundError('Feriado no encontrado')
    }

    const result = await new UpdateHoliday(repo).execute(
      holidayId,
      req.body.description || currentHoliday.Description,
      req.body.startDate ? new Date(req.body.startDate) : currentHoliday.StartDate
    )
    
    if (!result) {
      throw new NotFoundError('Feriado no encontrado')
    }

    Logger.info('Holiday updated successfully:', { HolidayID: result.HolidayID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateHolidayHandler:', error)
    next(error)
  }
}

export const deleteHolidayHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const holidayId = +req.params.id
    
    if (isNaN(holidayId) || holidayId <= 0) {
      throw new BadRequestError('El ID del feriado debe ser un número válido mayor a 0')
    }

    // Verificar que el feriado existe antes de eliminarlo
    const existingHoliday = await new GetHolidayById(repo).execute(holidayId)
    
    if (!existingHoliday) {
      throw new NotFoundError('Feriado no encontrado')
    }

    await new DeleteHoliday(repo).execute(holidayId)

    return res.status(204).json(ApiResponse.success(null, 'Feriado eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteHolidayHandler:', error)
    next(error)
  }
}

export const getPaginatedHolidaysHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedHolidays(repo).execute(page, limit)
    
    Logger.info('Holidays found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedHolidaysHandler:', error)
    next(error)
  }
}
