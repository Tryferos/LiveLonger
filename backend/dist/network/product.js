"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductQRCode = exports.getProductsQueryFood = void 0;
const _1 = __importDefault(require("."));
const Network_1 = require("../constants/Network");
const product_1 = require("../database/schema/product");
const product_2 = require("../libs/product");
const getProductsQueryFood = async (query) => {
    const res = await _1.default.get({ url: `${Network_1.foodsApi.SEARCH_FOOD}`, formatData: product_2.formatProductsSearch, params: { query: query } });
    if (!res) {
        return null;
    }
    const data = { ...res, query: query };
    return data;
};
exports.getProductsQueryFood = getProductsQueryFood;
const getProductQRCode = async (qr_code) => {
    const productFromMongo = await product_1.ProductModel.findOne({ qrCode: qr_code });
    if (productFromMongo) {
        return productFromMongo.toObject();
    }
    const url = `${Network_1.foodsApi.SEARCH_QR_CODE}/${qr_code}`;
    const res = await _1.default.get({ url: url, formatData: product_2.formatProductQRCode });
    if (!res || !res.calories || !res.nutrients.protein || !res.nutrients.fat || !res.nutrients.carbohydrates) {
        return null;
    }
    const doc = await product_1.ProductModel.create(res);
    return { _id: doc._id, ...res };
};
exports.getProductQRCode = getProductQRCode;
