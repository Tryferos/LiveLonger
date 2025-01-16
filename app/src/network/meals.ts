import Network from '.';
import {API_ROUTES} from '../constants/network';
import {DailyMealsType, Product} from '../types/nutrition';

export const getDailyMeals = async (date: Date | null) => {
  const meals = await Network.post<DailyMealsType>({
    url: API_ROUTES.MEALS.MEALS_GET_DAILY,
    body: {date: date ?? new Date()},
  });
  return meals;
};

export const getMealsDaysAvailable = async () => {
  const dates = await Network.get<{dates: Date[]}>({
    url: API_ROUTES.MEALS.DATES_AVAILABLE,
    formatData: ({dates}: {dates: string[]}) => ({
      dates: dates.map(d => new Date(d)),
    }),
  });
  return {dates: dates?.dates ?? []};
};

export const deleteMealItem = async ({
  _id,
  quickMealId,
}: {
  _id: Pick<Product, '_id'>['_id'];
  quickMealId?: string;
}): Promise<boolean> => {
  const res = await Network.post<{success: true}>({
    url: API_ROUTES.MEALS.DELETE_MEAL_ITEM,
    body: {pid: _id, quickMealId: quickMealId},
    method: 'DELETE',
  });
  return !!res && res.success;
};
