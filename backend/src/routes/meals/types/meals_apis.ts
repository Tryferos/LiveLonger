import { MealFull, MealType } from "../../../database/schema/meal";
import { Nutrients } from "../../../database/schema/product";
import { QuickMealFull } from "../../../database/schema/quick_meal";

export type DailyMealsType = {
    meals: {
        [type in MealType]?: DailyMealType | DailyQuickMealType;
    }
} & AggregatedNutrientsType;

export type AggregatedNutrientsType = {
    totalNutrientsGrams: Nutrients | null;
    totalCalories: number;
}

export type DailyQuickMealType = {
    calories: number;
    quantity: number;
    quickMeal: QuickMealFull;
    nutrients_grams: Nutrients;
} & Pick<MealFull, 'type' | '_id'>

export type DailyMealType = {
    calories: number;
    grams: number;
    nutrients_grams: Nutrients;
    nutrients_percentage: Nutrients;
} & Pick<MealFull, 'products' | 'type'>

