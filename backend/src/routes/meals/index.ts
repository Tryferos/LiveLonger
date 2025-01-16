import express from "express";
import { ROUTES } from "../../constants/Routes";
import { ErrorMiddlewareTypeProps, TRequest, TResponse } from "../../types";
import { ErrorMiddlewareTypes } from "../../constants/ErrorHandling";
import { Meal, MealFull, MealModel } from "../../database/schema/meal";
import { deleteMealItem, getDailyMeals, getMealsDaysAvailable } from "../../network/meals";
import { DailyMealsType } from "./types/meals_apis";
import { getDayLimits } from "../../libs/dates";
import { deleteQuickMealProduct } from "../../network/quick_meals";

export const router = express.Router();

/* 
    * /meals
*/


router.post(ROUTES.MEALS.MEALS_GET_DAILY, async (req: TRequest<{date?: Date}>, res: TResponse<ErrorMiddlewareTypeProps | DailyMealsType | any>) => {
    const {date} = req.body;
    if(!date) {
        res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    const meals = await getDailyMeals({date, uid: res.locals.user!.uid});
    res.status(200).json(meals ?? {totalCalories: 0, meals: {}, totalNutrientsGrams: null});
})


router.get(ROUTES.MEALS.DATES_AVAILABLE, async (req: TRequest, res: TResponse<ErrorMiddlewareTypeProps | {dates: Date[]}>) => {
    const dates = await getMealsDaysAvailable({uid: res.locals.user!.uid});
    res.status(200).json({dates: dates});
});

router.delete(ROUTES.MEALS.DELETE_MEAL_ITEM, async (req: TRequest<{pid: string, quickMealId?: string}>, res: TResponse<ErrorMiddlewareTypeProps | {success: true}>) => {
    const {uid} = res.locals.user!;
    let deleted = false;
    if(req.body.quickMealId){
        deleted = await deleteQuickMealProduct({uid, pid: req.body.pid, mid: req.body.quickMealId});
    }else{
        deleted = await deleteMealItem({uid, pid: req.body.pid});
    }
    if(!deleted) {
        res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
        return;
    }
    res.status(200).json({success: true});
})


