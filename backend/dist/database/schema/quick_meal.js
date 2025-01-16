"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickMealModel = void 0;
const Schemas_1 = require("../../constants/Schemas");
const Types_1 = require("../../constants/Types");
const product_1 = require("./product");
const mongoose_1 = require("mongoose");
const QuickMealSchema = new mongoose_1.Schema({
    date: { type: Date, default: Date.now },
    type: { type: String, required: true, enum: Object.values(Types_1.MealTypes) },
    products: [{ type: product_1.ProductDBModel.schema, ref: Schemas_1.Schemas.ProductDB, required: true }],
    imageUrl: { type: String, required: false },
    uid: { type: String, required: true },
    name: { type: String, required: true },
});
exports.QuickMealModel = (0, mongoose_1.model)(Schemas_1.Schemas.QuickMeal, QuickMealSchema);
