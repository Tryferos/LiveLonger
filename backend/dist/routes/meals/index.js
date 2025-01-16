"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Routes_1 = require("../../constants/Routes");
const ErrorHandling_1 = require("../../constants/ErrorHandling");
const meals_1 = require("../../network/meals");
const quick_meals_1 = require("../../network/quick_meals");
exports.router = express_1.default.Router();
/*
    * /meals
*/
exports.router.post(Routes_1.ROUTES.MEALS.MEALS_GET_DAILY, async (req, res) => {
    const { date } = req.body;
    if (!date) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    const meals = await (0, meals_1.getDailyMeals)({ date, uid: res.locals.user.uid });
    res.status(200).json(meals ?? { totalCalories: 0, meals: {}, totalNutrientsGrams: null });
});
exports.router.get(Routes_1.ROUTES.MEALS.DATES_AVAILABLE, async (req, res) => {
    const dates = await (0, meals_1.getMealsDaysAvailable)({ uid: res.locals.user.uid });
    res.status(200).json({ dates: dates });
});
exports.router.delete(Routes_1.ROUTES.MEALS.DELETE_MEAL_ITEM, async (req, res) => {
    const { uid } = res.locals.user;
    let deleted = false;
    if (req.body.quickMealId) {
        deleted = await (0, quick_meals_1.deleteQuickMealProduct)({ uid, pid: req.body.pid, mid: req.body.quickMealId });
    }
    else {
        deleted = await (0, meals_1.deleteMealItem)({ uid, pid: req.body.pid });
    }
    if (!deleted) {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.status(200).json({ success: true });
});
