"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedUserHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.getUserByIdHandler = exports.createUserHandler = void 0;
const Logger_1 = require("./../../Shared/Utils/Logger");
const data_source_1 = require("../../Infrastructure/Database/data-source");
const TypeORMUserRepository_1 = require("../../Infrastructure/Repositories/TypeORMUserRepository");
const CreateUser_1 = require("../../Application/User/CreateUser");
const GetUserById_1 = require("../../Application/User/GetUserById");
const UpdateUser_1 = require("../../Application/User/UpdateUser");
const DeleteUser_1 = require("../../Application/User/DeleteUser");
const GetPaginatedUser_1 = require("../../Application/User/GetPaginatedUser");
const ApiResponse_1 = require("../../Shared/Utils/ApiResponse");
const BadRequestError_1 = require("../../Shared/Errors/BadRequestError");
const NotFoundError_1 = require("../../Shared/Errors/NotFoundError");
const repo = new TypeORMUserRepository_1.TypeORMUserRepository();
data_source_1.AppDataSource.initialize().then(() => {
    Logger_1.Logger.info('📦 TypeORM connected to PostgreSQL - UserController');
}).catch((error) => Logger_1.Logger.error('Error connecting to TypeORM:', error));
const createUserHandler = async (req, res, next) => {
    try {
        if (!req.body.Login || req.body.Login.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El Login es obligatorio');
        }
        if (!req.body.FirstName || req.body.FirstName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El FirstName es obligatorio');
        }
        if (!req.body.LastName || req.body.LastName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El LastName es obligatorio');
        }
        if (!req.body.Password || req.body.Password.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El Password es obligatorio');
        }
        if (!req.body.CompanyID || req.body.CompanyID === 0) {
            throw new BadRequestError_1.BadRequestError('El CompanyID es obligatorio');
        }
        const result = await new CreateUser_1.CreateUser(repo).execute(req.body);
        Logger_1.Logger.info('User created successfully:', { UserID: result.UserID });
        return res.status(201).json(ApiResponse_1.ApiResponse.created({ UserID: result.UserID }));
    }
    catch (error) {
        Logger_1.Logger.error('Error in createUserHandler:', error);
        next(error);
    }
};
exports.createUserHandler = createUserHandler;
const getUserByIdHandler = async (req, res, next) => {
    try {
        const userId = +req.params.id;
        if (isNaN(userId) || userId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del usuario debe ser un número válido mayor a 0');
        }
        const data = await new GetUserById_1.GetUserById(repo).execute(userId);
        if (!data) {
            throw new NotFoundError_1.NotFoundError('Usuario no encontrado');
        }
        Logger_1.Logger.info('User found successfully:', { UserID: data.UserID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(data));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getUserByIdHandler:', error);
        next(error);
    }
};
exports.getUserByIdHandler = getUserByIdHandler;
const updateUserHandler = async (req, res, next) => {
    try {
        const userId = +req.params.id;
        if (isNaN(userId) || userId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del usuario debe ser un número válido mayor a 0');
        }
        // Validar que al menos un campo sea proporcionado para actualizar
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError_1.BadRequestError('Se debe proporcionar al menos un campo para actualizar');
        }
        // Validar campos específicos si están presentes
        if (req.body.Login !== undefined && req.body.Login.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El Login no puede estar vacío');
        }
        if (req.body.FirstName !== undefined && req.body.FirstName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El FirstName no puede estar vacío');
        }
        if (req.body.LastName !== undefined && req.body.LastName.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El LastName no puede estar vacío');
        }
        if (req.body.Password !== undefined && req.body.Password.trim() === '') {
            throw new BadRequestError_1.BadRequestError('El Password no puede estar vacío');
        }
        if (req.body.CompanyID !== undefined && req.body.CompanyID === 0) {
            throw new BadRequestError_1.BadRequestError('El CompanyID no puede estar vacío');
        }
        const result = await new UpdateUser_1.UpdateUser(repo).execute(userId, req.body);
        if (!result) {
            throw new NotFoundError_1.NotFoundError('Usuario no encontrado');
        }
        Logger_1.Logger.info('User updated successfully:', { UserID: result.UserID });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in updateUserHandler:', error);
        next(error);
    }
};
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = async (req, res, next) => {
    try {
        const userId = +req.params.id;
        if (isNaN(userId) || userId <= 0) {
            throw new BadRequestError_1.BadRequestError('El ID del usuario debe ser un número válido mayor a 0');
        }
        // Verificar que el usuario existe antes de eliminarlo
        const existingUser = await new GetUserById_1.GetUserById(repo).execute(userId);
        if (!existingUser) {
            throw new NotFoundError_1.NotFoundError('Usuario no encontrado');
        }
        await new DeleteUser_1.DeleteUser(repo).execute(userId);
        Logger_1.Logger.info('User deleted successfully:', { UserID: userId });
        return res.status(204).json(ApiResponse_1.ApiResponse.success(null, 'Usuario eliminado exitosamente'));
    }
    catch (error) {
        Logger_1.Logger.error('Error in deleteUserHandler:', error);
        next(error);
    }
};
exports.deleteUserHandler = deleteUserHandler;
const getPaginatedUserHandler = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        // Validar parámetros de paginación
        if (page <= 0) {
            throw new BadRequestError_1.BadRequestError('El número de página debe ser mayor a 0');
        }
        if (limit <= 0 || limit > 100) {
            throw new BadRequestError_1.BadRequestError('El límite debe estar entre 1 y 100');
        }
        const result = await new GetPaginatedUser_1.GetPaginatedUser(repo).execute(page, limit);
        Logger_1.Logger.info('Users found successfully:', { page, limit, total: result.length });
        return res.status(200).json(ApiResponse_1.ApiResponse.success(result));
    }
    catch (error) {
        Logger_1.Logger.error('Error in getPaginatedUserHandler:', error);
        next(error);
    }
};
exports.getPaginatedUserHandler = getPaginatedUserHandler;
//# sourceMappingURL=user.controller.js.map