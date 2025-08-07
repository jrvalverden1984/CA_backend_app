import { Request, Response, NextFunction } from 'express'
//import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMJobRoleRepository } from '../../Infrastructure/Repositories/TypeORMJobRoleRepository'
import { CreateJobRole } from '../../Application/JobRole/CreateJobRole'
import { GetJobRoleById } from '../../Application/JobRole/GetJobRoleById'
import { UpdateJobRole } from '../../Application/JobRole/UpdateJobRole'
import { DeleteJobRole } from '../../Application/JobRole/DeleteJobRole'
import { GetPaginatedJobRoles } from '../../Application/JobRole/GetPaginatedJobRoles'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMJobRoleRepository()

// AppDataSource.initialize().then(() => {
//   Logger.info('📦 TypeORM connected to PostgreSQL - JobRoleController')
// }).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createJobRoleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.description || req.body.description.trim() === '') {
      throw new BadRequestError('La descripción es obligatoria')
    }

    const result = await new CreateJobRole(repo).execute(req.body.description)

    Logger.info('JobRole created successfully:', { JobRoleID: result.JobRoleID })
    return res.status(201).json(ApiResponse.created({ JobRoleID: result.JobRoleID }))
  } catch (error) {
    Logger.error('Error in createJobRoleHandler:', error)
    next(error)
  }
}

export const getJobRoleByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobRoleId = +req.params.id
    
    if (isNaN(jobRoleId) || jobRoleId <= 0) {
      throw new BadRequestError('El ID del puesto de trabajo debe ser un número válido mayor a 0')
    }

    const data = await new GetJobRoleById(repo).execute(jobRoleId)
    
    if (!data) {
      throw new NotFoundError('Puesto de trabajo no encontrado')
    }

    Logger.info('JobRole found successfully:', { JobRoleID: data.JobRoleID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getJobRoleByIdHandler:', error)
    next(error)
  }
}

export const updateJobRoleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobRoleId = +req.params.id
    
    if (isNaN(jobRoleId) || jobRoleId <= 0) {
      throw new BadRequestError('El ID del puesto de trabajo debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.description !== undefined && req.body.description.trim() === '') {
      throw new BadRequestError('La descripción no puede estar vacía')
    }

    const result = await new UpdateJobRole(repo).execute(jobRoleId, req.body.description)
    
    if (!result) {
      throw new NotFoundError('Puesto de trabajo no encontrado')
    }

    Logger.info('JobRole updated successfully:', { JobRoleID: result.JobRoleID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateJobRoleHandler:', error)
    next(error)
  }
}

export const deleteJobRoleHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobRoleId = +req.params.id
    
    if (isNaN(jobRoleId) || jobRoleId <= 0) {
      throw new BadRequestError('El ID del puesto de trabajo debe ser un número válido mayor a 0')
    }

    // Verificar que el puesto de trabajo existe antes de eliminarlo
    const existingJobRole = await new GetJobRoleById(repo).execute(jobRoleId)
    
    if (!existingJobRole) {
      throw new NotFoundError('Puesto de trabajo no encontrado')
    }

    await new DeleteJobRole(repo).execute(jobRoleId)

    return res.status(204).json(ApiResponse.success(null, 'Puesto de trabajo eliminado exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteJobRoleHandler:', error)
    next(error)
  }
}

export const getPaginatedJobRolesHandler = async (req: Request, res: Response, next: NextFunction) => {
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

    const result = await new GetPaginatedJobRoles(repo).execute(page, limit)
    
    Logger.info('JobRoles found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedJobRolesHandler:', error)
    next(error)
  }
}
