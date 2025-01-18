import {Meal, MealFull, MealModel} from '../database/schema/meal';
import {QuickMealModel} from '../database/schema/quick_meal';
import {getProductDBMeal} from '../libs/product';
import {QuickMealQuantityFactor} from '../routes/foods/types/product_apis';

export const saveNutrition = async (meal: MealFull): Promise<Meal | null> => {
  const doc = await MealModel.create(await getProductDBMeal(meal));
  return doc.toObject();
};

export const saveQuickMealNutrition = async (
  meal: Pick<MealFull, 'quickMealId' | 'uid' | 'type'>,
  quantity_factor?: QuickMealQuantityFactor['quantity_factor'],
): Promise<Meal | null> => {
  const quickMealDoc = await QuickMealModel.findOne({
    _id: meal.quickMealId,
    uid: meal.uid,
  }).exec();
  const quantityFactor = quantity_factor ?? 1;
  if (quickMealDoc) {
    const mealData: Meal = {
      date: new Date(),
      products: quickMealDoc.products.map(p => ({
        ...p,
        quantity: p.quantity * quantityFactor,
      })),
      type: meal.type ?? quickMealDoc.type,
      uid: meal.uid,
      quickMealId: meal.quickMealId,
    };
    const doc = await MealModel.create(mealData);
    return doc.toObject();
  } else {
    return null;
  }
};
