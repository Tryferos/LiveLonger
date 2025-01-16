"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Schemas_1 = require("../../constants/Schemas");
const Types_1 = require("../../constants/Types");
const ProgramSchema = new mongoose_1.Schema({
    program: { type: String, required: true, enum: Object.keys(Types_1.ProgramValues) },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    uid: { type: String, required: true, unique: false },
});
exports.ProgramModel = mongoose_1.default.model(Schemas_1.Schemas.Program, ProgramSchema);
