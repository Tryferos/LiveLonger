"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDBModel = exports.ProductModel = void 0;
const Schemas_1 = require("../../constants/Schemas");
const Types_1 = require("../../constants/Types");
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = Schema;
const ProductSchema = new Schema({
    date: { type: Date, default: Date.now },
    qrCode: { type: String, required: false, unique: false },
    imageUrl: { type: String, required: false },
    quantity: { type: Number, required: true },
    type: { type: String, required: true, enum: Object.values(Types_1.ProductTypes), default: Types_1.ProductTypes.INDIVIDUAL_QUERIED },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    servingSize: { type: Number, required: false },
    hasServingSize: { type: Boolean, required: true, default: false },
    nutrients: { type: Object, required: true },
});
exports.ProductModel = mongoose_1.default.model(Schemas_1.Schemas.Product, ProductSchema);
const ProductDBSchema = new Schema({
    quantity: { type: Number, required: true },
    pid: { type: Schema.Types.ObjectId, ref: Schemas_1.Schemas.Product, required: true, unique: false },
    addedBy: { type: String, required: false },
    date: { type: Date, default: Date.now },
});
exports.ProductDBModel = mongoose_1.default.model(Schemas_1.Schemas.ProductDB, ProductDBSchema);
