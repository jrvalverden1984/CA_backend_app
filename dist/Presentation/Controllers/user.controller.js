"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const CreateUser_1 = require("../../Application/User/CreateUser");
const TypeORMUserRepository_1 = require("../../Infrastructure/Repositories/TypeORMUserRepository");
const data_source_1 = require("../../Infrastructure/Database/data-source");
const repo = new TypeORMUserRepository_1.TypeORMUserRepository();
const createUser = new CreateUser_1.CreateUser(repo);
data_source_1.AppDataSource.initialize().then(() => {
    console.log('📦 TypeORM conectado a PostgreSQL');
}).catch((error) => console.error('Error al conectar TypeORM:', error));
const createUserHandler = async (req, res) => {
    const { id, name, email } = req.body;
    await createUser.execute(id, name, email);
    res.status(201).send({ message: 'User created' });
};
exports.createUserHandler = createUserHandler;
