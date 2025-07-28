"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = require("./Shared/Utils/Logger");
dotenv_1.default.config();
const PORT = process.env.PORT || 7001;
app_1.default.listen(PORT, () => {
    Logger_1.Logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map