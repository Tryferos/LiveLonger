import Network from '.';
import {API_ROUTES} from '../constants/network';
import {Product, QuickMeal, QuickMealInfo} from '../types/nutrition';

export const saveQuickMeal = async (quickMeal: QuickMeal) => {
  const res = await Network.post<{success: boolean}>({
    url: API_ROUTES.QUICK_MEALS.SAVE,
    body: quickMeal,
  });
  return res?.success ?? false;
};

export const getQuickMeals = async (
  date?: Date,
  useMinimumResponseTime?: boolean,
) => {
  const res = await Network.get<{quickMeals: QuickMealInfo[]; date: string}>({
    url: API_ROUTES.QUICK_MEALS.GET,
    params: {date: (date ?? new Date()).getTime().toString()},
    useMinimumResponseTime: useMinimumResponseTime,
    formatData: data => ({
      ...data,
      quickMeals: data.quickMeals.map((quickMeal: QuickMeal) => ({
        ...{
          ...quickMeal,
          date: new Date(quickMeal.date),
          products: quickMeal.products.map(product => ({
            ...product,
            date: new Date(product?.date ?? new Date()),
          })),
        },
        date: new Date(quickMeal.date),
      })),
    }),
  });
  return res;
};

export const getQuickMeal = async (
  mid: string,
  useMinimumResponseTime?: boolean,
) => {
  const res = await Network.get<{quickMeal: QuickMealInfo}>({
    url: API_ROUTES.QUICK_MEALS.GET_MEAL,
    params: {mid: mid},
    useMinimumResponseTime: useMinimumResponseTime,
    formatData: data => ({
      quickMeal: {
        ...data.quickMeal,
        products: data.quickMeal.products.map((product: Product) => ({
          ...product,
          date: new Date(`${product.date}`),
        })),
        date: new Date(data.quickMeal.date),
      },
    }),
  });
  return res;
};

export const deleteQuickMeal = async ({_id}: Pick<QuickMeal, '_id'>) => {
  const res = await Network.post<{success: boolean}>({
    method: 'DELETE',
    url: API_ROUTES.QUICK_MEALS.DELETE,
    body: {mid: _id},
  });
  return res?.success ?? false;
};
