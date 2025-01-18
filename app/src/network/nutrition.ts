import Network from '.';
import {API_ROUTES} from '../constants/network';
import {getMealType} from '../libs/meal';
import {Meal, MealType, Product} from '../types/nutrition';

export const saveNutrition = async (
  products: Product[],
): Promise<Meal | null> => {
  const currentDate = new Date();
  const meal: Meal = {
    products: products,
    date: currentDate,
    type: getMealType(currentDate),
  };
  const response = await Network.post<Meal>({
    url: API_ROUTES.FOODS.FOODS_SAVE,
    body: meal,
  });
  return response;
};

export const saveQuickMealNutrition = async ({
  quickMealId,
  quantity_factor,
  type,
}: {
  quickMealId: string;
  quantity_factor: number;
  type?: MealType;
}) => {
  const response = await Network.post<Meal>({
    url: API_ROUTES.FOODS.FOODS_SAVE_QUICK_MEAL,
    body: {
      quickMealId: quickMealId,
      type: type,
      quantity_factor: quantity_factor,
    },
  });
  return response;
};
