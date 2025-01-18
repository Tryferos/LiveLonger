import {MealFull, MealType} from '../../../database/schema/meal';
import {Nutrients} from '../../../database/schema/product';
import {
  QuickMealFull,
  QuickMealInfo,
} from '../../../database/schema/quick_meal';

export type DailyMealsType = {
  meals: {
    [type in MealType]?: DailyMealType | DailyQuickMealType;
  };
} & AggregatedNutrientsType;

export type AggregatedNutrientsType = {
  totalNutrientsGrams: Nutrients | null;
  totalCalories: number;
};

export type DailyQuickMealType = {
  calories: number;
  quantity: number;
  quickMeals: QuickMealInfo[];
  nutrients_grams: Nutrients;
} & Pick<MealFull, 'type'>;

export type DailyMealType = {
  calories: number;
  grams: number;
  nutrients_grams: Nutrients;
  nutrients_percentage: Nutrients;
} & Pick<MealFull, 'products' | 'type'>;
