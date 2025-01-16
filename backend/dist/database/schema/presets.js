"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresetsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = Schema;
const Schemas_1 = require("../../constants/Schemas");
const PresetsSchema = new Schema({
    daily_calories: { type: Number, required: false },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    activity_level: { type: Number, required: true },
    sex: { type: String, required: true, enum: Object.values(['male', 'female']) },
    uid: { type: String, required: true, unique: true },
});
exports.PresetsModel = mongoose_1.default.model(Schemas_1.Schemas.Presets, PresetsSchema);
