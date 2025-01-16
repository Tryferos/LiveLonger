import { MealTypes } from "../constants/Types";
import {  Meal, MealFull, MealModel, MealType } from "../database/schema/meal";
import { Product, ProductDBModel, ProductModel } from "../database/schema/product";
import { QuickMealModel } from "../database/schema/quick_meal";
import { getDateDayStart, getDayLimits, } from "../libs/dates";
import { getFileSignedUrl, getFirestoreFile } from "../libs/images";
import { getMealsFull } from "../libs/meals";
import { formatProductWithGrams, getNutrientsGrams, getNutrientsPercentage, getProductsAggregatedCalories, getProductsAggregatedQuantity, getTotalNutrients } from "../libs/product";
import {  DailyMealsType, DailyMealType, DailyQuickMealType } from "../routes/meals/types/meals_apis";

type getDailyMealsProps = {
    date: Date;
    uid: string;
}
export const getDailyMeals = async ({date, uid}: getDailyMealsProps): Promise<DailyMealsType | null> => {
    const {start: startDate, end: endDate} = getDayLimits(date);
    const _meals = await MealModel.find({uid: uid, quickMealId: null}).where('date').lte(endDate).gte(startDate).sort({date: -1}).exec();
    const quickMealsDaily = await getDailyQuickMeals({date, uid});
    const mealsDailyTotal: DailyMealsType = {meals: {},totalCalories: 0, totalNutrientsGrams: null};
    if((!_meals || _meals.length === 0) && (!quickMealsDaily || !quickMealsDaily.meals)) {
        return null;
    }
    if(_meals && _meals.length > 0){
        const meals = _meals.map(meal => meal.toObject() as MealFull);
        let totalCalories = 0;
        const mealsDaily: DailyMealsType = {totalCalories: 0, meals: {},totalNutrientsGrams: null};
        for(const key of Object.keys(MealTypes)) {
            const mealsOfType = meals.filter((meal: MealFull) => meal.type === key) as MealFull[];
            const products = (await getMealsFull(mealsOfType)).map(item => item.products).flat();
            const calories =  getProductsAggregatedCalories(products)
            const quantity = getProductsAggregatedQuantity(products);
            const nutrients = getNutrientsGrams(products);
            const nutrientsPercentage = getNutrientsPercentage(products, quantity);
            mealsDaily.meals[key as MealType] = {products: products, calories: calories,type: key as MealType, grams: quantity,nutrients_grams: nutrients,nutrients_percentage: nutrientsPercentage};
            totalCalories += calories;
        }
        mealsDaily.totalCalories = Math.round(totalCalories);
        mealsDaily.totalNutrientsGrams = getTotalNutrients(mealsDaily.meals).grams;

        mealsDailyTotal.meals = mealsDaily.meals;
        mealsDailyTotal.totalCalories = mealsDaily.totalCalories;
        // mealsDailyTotal.totalNutrientsGrams = mealsDaily.totalNutrientsGrams;
    }
    if(quickMealsDaily && quickMealsDaily.meals){
        const totalMealsDaily: DailyMealsType['meals'] = {};
        for(const _key of Object.keys(MealTypes)){
            const key = _key as keyof typeof MealTypes;
            // @ts-ignore
            totalMealsDaily[key] = {
                ...mealsDailyTotal.meals[key],
                ...quickMealsDaily.meals[key],
                calories: (mealsDailyTotal.meals[key]?.calories ?? 0) + (quickMealsDaily.meals[key]?.calories ?? 0),    
            }
        }
        mealsDailyTotal.meals = totalMealsDaily;
        mealsDailyTotal.totalCalories = mealsDailyTotal.totalCalories + quickMealsDaily.totalCalories;
    }

    return mealsDailyTotal;
}

export const getDailyQuickMeals = async ({date, uid}: getDailyMealsProps): Promise<DailyMealsType | null> => {
    const {start: startDate, end: endDate} = getDayLimits(date);
    const _meals = await MealModel.find({uid: uid, quickMealId: {$exists: true}}).where('date').lte(endDate).gte(startDate).sort({date: -1}).exec();
    if(!_meals || _meals.length === 0) {
        return null;
    }
    const meals = _meals.map(meal => meal.toObject());
    const dailyMeals: Pick<DailyMealsType, 'meals'>['meals'] = {};
    let totalCalories = 0;
    for(const meal of meals) {
        const quickMeal = await QuickMealModel.findById(meal.quickMealId).exec();
        const productsFull: Product[] = [];
        for(const product of meal.products) {
            const productFull = await ProductModel.findById(product.pid).populate('nutrients').exec();
            if(productFull){
                productsFull.push(formatProductWithGrams(productFull.toObject(), product.quantity));
            }
        }
        const mealsCalories = Math.round(productsFull.reduce((acc, product) => acc + (product?.calories ?? 0), 0));
        totalCalories += mealsCalories;
        dailyMeals[meal.type] = {
            _id: meal._id,
            type: meal.type,
            quickMeal: {...quickMeal?.toObject(), products: productsFull,imageUrl: await getFileSignedUrl(getFirestoreFile(quickMeal?._id))},
            calories: mealsCalories,
            quantity: productsFull.reduce((acc, product) => acc + (product?.quantity ?? 0), 0),
            nutrients_grams: getNutrientsGrams(productsFull),
        } as DailyQuickMealType;
    }
    return {
        meals: dailyMeals,
        totalCalories: Math.round(totalCalories),
        totalNutrientsGrams: getTotalNutrients(dailyMeals).grams,
    } as DailyMealsType;
}

export const getMealsDaysAvailable = async ({uid}: {uid: string}): Promise<Date[]> => {
    const dates = await MealModel.find({uid: uid}).distinct('date').exec();
    let uniqueDates: Date[] = [];
    for(const date of dates) {
        const dateDayStart = getDateDayStart(date);
        if(!uniqueDates.some(date => date.getTime() === dateDayStart.getTime())) {
            uniqueDates.push(dateDayStart);
        }
    }
    const currentDate = getDateDayStart(new Date());
    if(uniqueDates.last()?.getTime()!==currentDate.getTime()){
        uniqueDates.push(currentDate);
    }
    return uniqueDates.limit(16);
}

export const deleteMealItem = async ({uid, pid}: {uid: string, pid: string}): Promise<boolean> => {
    const doc = await ProductDBModel.findOne({ _id: pid}).exec();
    if(!doc) {
        return false;
    }
    const {_id} = doc.toObject();
    const mealDoc = await MealModel.findOne({uid: uid, "products._id": _id}).exec();
    if(mealDoc){
        mealDoc.products = mealDoc.products.filter(product => product._id?.toString() !== _id?.toString());
        await ProductDBModel.deleteOne({_id: _id}).exec();
        if(mealDoc.products.length === 0){
            await MealModel.deleteOne({uid: uid, _id: mealDoc._id}).exec(); 
        }else{
            await mealDoc.set({products: mealDoc.products}).save();
        }
    }
    return !!mealDoc?._id;;
}
