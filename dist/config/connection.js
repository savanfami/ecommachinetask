"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
exports.PORT = Number(process.env.PORT || 8000);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uri = process.env.MONGO_URI;
        const client = yield mongoose_1.default.connect(uri);
        if (client) {
            console.log(`
          -----------------------------------
          - MONGODB CONNECTED  -
          -----------------------------------
        `);
        }
        else {
            console.error("Failed to connect to MongoDB.");
            process.exit(1);
        }
    }
    catch (error) {
        console.error('Error connecting to MongoDb:', error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
