"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = require("./Shared/Utils/Logger");
const data_source_1 = require("./Infrastructure/Database/data-source");
dotenv_1.default.config();
const PORT = process.env.PORT || 7001;
// app.listen(PORT, () => {
//   Logger.info(`🚀 Server running on http://localhost:${PORT}`)
// })
// Inicializar la conexión a la base de datos antes de arrancar el servidor
data_source_1.AppDataSource.initialize()
    .then(() => {
    Logger_1.Logger.info('📦 TypeORM connected to PostgreSQL successfully');
    // Arrancar el servidor solo después de conectar a la base de datos
    app_1.default.listen(PORT, () => {
        Logger_1.Logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    Logger_1.Logger.error('❌ Error connecting to database:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map