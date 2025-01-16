"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log('[Database] Connected to Mongo');
}).catch((err) => {
    console.log(`[Database] Error connecting to Mongo\n${err}`);
});
