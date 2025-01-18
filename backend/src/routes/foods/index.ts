import express, {NextFunction} from 'express';
import {
  ErrorMiddlewareType,
  ErrorMiddlewareTypeProps,
  TRequest,
  TResponse,
} from '../../types';
import {getProductQRCode, getProductsQueryFood} from '../../network/product';
import {Product} from '../../database/schema/product';
import {ErrorMiddlewareTypes, ErrorNames} from '../../constants/ErrorHandling';
import {
  ProductQRCodeRequest,
  ProductQueryRequest,
  ProductQueryResponse,
  QuickMealQuantityFactor,
} from './types/product_apis';
import {ROUTES} from '../../constants/Routes';
import {Meal, MealFull} from '../../database/schema/meal';
import {saveNutrition, saveQuickMealNutrition} from '../../network/nutrition';

export const router = express.Router();

/*
 * /foods
 */

router.get(
  ROUTES.FOODS.FOODS_SEARCH,
  async (
    req: TRequest<any, ProductQueryRequest>,
    res: TResponse<ProductQueryResponse | ErrorMiddlewareTypeProps>,
    next,
  ) => {
    const {query} = req.query;
    const product = await getProductsQueryFood(query);
    if (!product) {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
      return;
    } else {
      res.json(product);
    }
  },
);

router.get(
  ROUTES.FOODS.FOODS_QR_CODE,
  async (
    req: TRequest<any, any, ProductQRCodeRequest>,
    res: TResponse<Product | ErrorMiddlewareTypeProps>,
  ) => {
    const {qr_code} = req.params;
    const product = await getProductQRCode(qr_code);
    if (!product) {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
      return;
    }
    res.json(product);
  },
);

router.post(
  ROUTES.FOODS.FOODS_SAVE,
  async (
    req: TRequest<MealFull>,
    res: TResponse<Meal | ErrorMiddlewareTypeProps>,
  ) => {
    const meal = req.body;
    const {uid} = res.locals.user!;
    if (!meal || !meal.products) {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
      return;
    }
    const savedMeal = await saveNutrition({...meal, uid});
    if (!savedMeal) {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
      return;
    }
    res.status(200).json(savedMeal);
  },
);

router.post(
  ROUTES.FOODS.FOODS_SAVE_QUICK_MEAL,
  async (
    req: TRequest<
      Pick<MealFull, 'quickMealId' | 'type'> & QuickMealQuantityFactor
    >,
    res: TResponse<Meal | ErrorMiddlewareTypeProps>,
  ) => {
    const {quantity_factor, ...meal} = req.body;
    const {uid} = res.locals.user!;
    if (!meal || !meal.quickMealId) {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
      return;
    }
    const savedMeal = await saveQuickMealNutrition(
      {
        ...meal,
        uid,
        type: meal.type,
      },
      quantity_factor,
    );
    if (!savedMeal) {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
      return;
    }
    res.status(200).json(savedMeal);
  },
);
