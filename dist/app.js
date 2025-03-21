"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = require("./config/connection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)(''));
app.listen(connection_1.PORT, () => {
    console.log(`server listening on PORT localhost://${connection_1.PORT}`);
});
