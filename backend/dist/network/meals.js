"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMealItem = exports.getMealsDaysAvailable = exports.getDailyQuickMeals = exports.getDailyMeals = void 0;
const Types_1 = require("../constants/Types");
const meal_1 = require("../database/schema/meal");
const product_1 = require("../database/schema/product");
const quick_meal_1 = require("../database/schema/quick_meal");
const dates_1 = require("../libs/dates");
const images_1 = require("../libs/images");
const meals_1 = require("../libs/meals");
const product_2 = require("../libs/product");
const getDailyMeals = async ({ date, uid }) => {
    const { start: startDate, end: endDate } = (0, dates_1.getDayLimits)(date);
    const _meals = await meal_1.MealModel.find({ uid: uid, quickMealId: null }).where('date').lte(endDate).gte(startDate).sort({ date: -1 }).exec();
    const quickMealsDaily = await (0, exports.getDailyQuickMeals)({ date, uid });
    const mealsDailyTotal = { meals: {}, totalCalories: 0, totalNutrientsGrams: null };
    if ((!_meals || _meals.length === 0) && (!quickMealsDaily || !quickMealsDaily.meals)) {
        return null;
    }
    if (_meals && _meals.length > 0) {
        const meals = _meals.map(meal => meal.toObject());
        let totalCalories = 0;
        const mealsDaily = { totalCalories: 0, meals: {}, totalNutrientsGrams: null };
        for (const key of Object.keys(Types_1.MealTypes)) {
            const mealsOfType = meals.filter((meal) => meal.type === key);
            const products = (await (0, meals_1.getMealsFull)(mealsOfType)).map(item => item.products).flat();
            const calories = (0, product_2.getProductsAggregatedCalories)(products);
            const quantity = (0, product_2.getProductsAggregatedQuantity)(products);
            const nutrients = (0, product_2.getNutrientsGrams)(products);
            const nutrientsPercentage = (0, product_2.getNutrientsPercentage)(products, quantity);
            mealsDaily.meals[key] = { products: products, calories: calories, type: key, grams: quantity, nutrients_grams: nutrients, nutrients_percentage: nutrientsPercentage };
            totalCalories += calories;
        }
        mealsDaily.totalCalories = Math.round(totalCalories);
        mealsDaily.totalNutrientsGrams = (0, product_2.getTotalNutrients)(mealsDaily.meals).grams;
        mealsDailyTotal.meals = mealsDaily.meals;
        mealsDailyTotal.totalCalories = mealsDaily.totalCalories;
        // mealsDailyTotal.totalNutrientsGrams = mealsDaily.totalNutrientsGrams;
    }
    if (quickMealsDaily && quickMealsDaily.meals) {
        const totalMealsDaily = {};
        for (const _key of Object.keys(Types_1.MealTypes)) {
            const key = _key;
            // @ts-ignore
            totalMealsDaily[key] = {
                ...mealsDailyTotal.meals[key],
                ...quickMealsDaily.meals[key],
                calories: (mealsDailyTotal.meals[key]?.calories ?? 0) + (quickMealsDaily.meals[key]?.calories ?? 0),
            };
        }
        mealsDailyTotal.meals = totalMealsDaily;
        mealsDailyTotal.totalCalories = mealsDailyTotal.totalCalories + quickMealsDaily.totalCalories;
    }
    return mealsDailyTotal;
};
exports.getDailyMeals = getDailyMeals;
const getDailyQuickMeals = async ({ date, uid }) => {
    const { start: startDate, end: endDate } = (0, dates_1.getDayLimits)(date);
    const _meals = await meal_1.MealModel.find({ uid: uid, quickMealId: { $exists: true } }).where('date').lte(endDate).gte(startDate).sort({ date: -1 }).exec();
    if (!_meals || _meals.length === 0) {
        return null;
    }
    const meals = _meals.map(meal => meal.toObject());
    const dailyMeals = {};
    let totalCalories = 0;
    for (const meal of meals) {
        const quickMeal = await quick_meal_1.QuickMealModel.findById(meal.quickMealId).exec();
        const productsFull = [];
        for (const product of meal.products) {
            const productFull = await product_1.ProductModel.findById(product.pid).populate('nutrients').exec();
            if (productFull) {
                productsFull.push((0, product_2.formatProductWithGrams)(productFull.toObject(), product.quantity));
            }
        }
        const mealsCalories = Math.round(productsFull.reduce((acc, product) => acc + (product?.calories ?? 0), 0));
        totalCalories += mealsCalories;
        dailyMeals[meal.type] = {
            _id: meal._id,
            type: meal.type,
            quickMeal: { ...quickMeal?.toObject(), products: productsFull, imageUrl: await (0, images_1.getFileSignedUrl)((0, images_1.getFirestoreFile)(quickMeal?._id)) },
            calories: mealsCalories,
            quantity: productsFull.reduce((acc, product) => acc + (product?.quantity ?? 0), 0),
            nutrients_grams: (0, product_2.getNutrientsGrams)(productsFull),
        };
    }
    return {
        meals: dailyMeals,
        totalCalories: Math.round(totalCalories),
        totalNutrientsGrams: (0, product_2.getTotalNutrients)(dailyMeals).grams,
    };
};
exports.getDailyQuickMeals = getDailyQuickMeals;
const getMealsDaysAvailable = async ({ uid }) => {
    const dates = await meal_1.MealModel.find({ uid: uid }).distinct('date').exec();
    let uniqueDates = [];
    for (const date of dates) {
        const dateDayStart = (0, dates_1.getDateDayStart)(date);
        if (!uniqueDates.some(date => date.getTime() === dateDayStart.getTime())) {
            uniqueDates.push(dateDayStart);
        }
    }
    const currentDate = (0, dates_1.getDateDayStart)(new Date());
    if (uniqueDates.last()?.getTime() !== currentDate.getTime()) {
        uniqueDates.push(currentDate);
    }
    return uniqueDates.limit(16);
};
exports.getMealsDaysAvailable = getMealsDaysAvailable;
const deleteMealItem = async ({ uid, pid }) => {
    const doc = await product_1.ProductDBModel.findOne({ _id: pid }).exec();
    if (!doc) {
        return false;
    }
    const { _id } = doc.toObject();
    const mealDoc = await meal_1.MealModel.findOne({ uid: uid, "products._id": _id }).exec();
    if (mealDoc) {
        mealDoc.products = mealDoc.products.filter(product => product._id?.toString() !== _id?.toString());
        await product_1.ProductDBModel.deleteOne({ _id: _id }).exec();
        if (mealDoc.products.length === 0) {
            await meal_1.MealModel.deleteOne({ uid: uid, _id: mealDoc._id }).exec();
        }
        else {
            await mealDoc.set({ products: mealDoc.products }).save();
        }
    }
    return !!mealDoc?._id;
    ;
};
exports.deleteMealItem = deleteMealItem;
