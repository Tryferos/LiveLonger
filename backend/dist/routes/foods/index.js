"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../../network/product");
const ErrorHandling_1 = require("../../constants/ErrorHandling");
const Routes_1 = require("../../constants/Routes");
const nutrition_1 = require("../../network/nutrition");
exports.router = express_1.default.Router();
/*
    * /foods
*/
exports.router.get(Routes_1.ROUTES.FOODS.FOODS_SEARCH, async (req, res, next) => {
    const { query } = req.query;
    const product = await (0, product_1.getProductsQueryFood)(query);
    if (!product) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    else {
        res.json(product);
    }
});
exports.router.get(Routes_1.ROUTES.FOODS.FOODS_QR_CODE, async (req, res) => {
    const { qr_code } = req.params;
    const product = await (0, product_1.getProductQRCode)(qr_code);
    if (!product) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.json(product);
});
exports.router.post(Routes_1.ROUTES.FOODS.FOODS_SAVE, async (req, res) => {
    const meal = req.body;
    const { uid } = res.locals.user;
    if (!meal || !meal.products) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    const savedMeal = await (0, nutrition_1.saveNutrition)({ ...meal, uid });
    if (!savedMeal) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.status(200).json(savedMeal);
});
exports.router.post(Routes_1.ROUTES.FOODS.FOODS_SAVE_QUICK_MEAL, async (req, res) => {
    const meal = req.body;
    const { uid } = res.locals.user;
    if (!meal || !meal.quickMealId) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    const savedMeal = await (0, nutrition_1.saveQuickMealNutrition)({ ...meal, uid, type: meal.type });
    if (!savedMeal) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.status(200).json(savedMeal);
});
