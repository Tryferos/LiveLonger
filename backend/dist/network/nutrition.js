"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveQuickMealNutrition = exports.saveNutrition = void 0;
const meal_1 = require("../database/schema/meal");
const quick_meal_1 = require("../database/schema/quick_meal");
const product_1 = require("../libs/product");
const saveNutrition = async (meal) => {
    const doc = await meal_1.MealModel.create(await (0, product_1.getProductDBMeal)(meal));
    return doc.toObject();
};
exports.saveNutrition = saveNutrition;
const saveQuickMealNutrition = async (meal) => {
    const quickMealDoc = await quick_meal_1.QuickMealModel.findOne({ _id: meal.quickMealId, uid: meal.uid }).exec();
    if (quickMealDoc) {
        const mealData = {
            date: new Date(),
            products: quickMealDoc.products,
            type: meal.type ?? quickMealDoc.type,
            uid: meal.uid,
            quickMealId: meal.quickMealId,
        };
        const doc = await meal_1.MealModel.create(mealData);
        return doc.toObject();
    }
    else {
        return null;
    }
};
exports.saveQuickMealNutrition = saveQuickMealNutrition;
