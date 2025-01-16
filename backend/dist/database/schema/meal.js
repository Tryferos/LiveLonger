"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealModel = void 0;
const Schemas_1 = require("../../constants/Schemas");
const Types_1 = require("../../constants/Types");
const product_1 = require("./product");
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const MealSchema = new Schema({
    date: { type: Date, default: Date.now },
    type: { type: String, required: true, enum: Object.values(Types_1.MealTypes) },
    products: [{ type: product_1.ProductDBModel.schema, ref: Schemas_1.Schemas.ProductDB, required: true }],
    uid: { type: String, required: true },
    quickMealId: { type: Schema.Types.ObjectId, ref: Schemas_1.Schemas.QuickMeal, required: false, unique: false },
});
exports.MealModel = mongoose_1.default.model(Schemas_1.Schemas.Meal, MealSchema);
