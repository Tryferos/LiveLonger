import express from 'express';
import {ROUTES} from '../../constants/Routes';
import {
  ErrorMiddlewareTypeProps,
  PaginationQuery,
  TRequest,
  TResponse,
} from '../../types';
import {
  deleteQuickMeal,
  deleteQuickMealProduct,
  getQuickMealInfo,
  getQuickMeals,
  getUniqueProducts,
  saveQuickMeal,
} from '../../network/quick_meals';
import {Meal, MealFull} from '../../database/schema/meal';
import {QuickMeal, QuickMealFull} from '../../database/schema/quick_meal';
import {Product} from '../../database/schema/product';
import {Model} from 'mongoose';
import {ErrorMiddlewareTypes} from '../../constants/ErrorHandling';

// type Callback1<T, K = any> = (item: T, req: TRequest, res: TResponse<K>) => void;
// type Callback2<K = any> = (req: TRequest, res: TResponse<K>) => void;

// class CustomRouter{
//     router: express.Router;
//     constructor(){
//         this.router = express.Router();
//     }
//     get<T, K = any>(path: string, callback: Callback1<T,K> | Callback2<K>){
//         // /:product
//         router.get(path, async(req:TRequest, res: TResponse<K>)=>{
//             const params = req.params;
//             // {product: '1'}
//             const schemaName = Object.keys(params).at(0);
//             if(!schemaName){
//                 (callback as Callback2<K>)(req, res as TResponse<K>);
//                 return;
//             }
//             const imports = await import(`../../database/schema/${schemaName}`);
//             const doc = await (imports[`${schemaName.upperFirst()}Model`] as Model<T>).findOne({_id: params[schemaName]}).exec();
//             if(doc){
//                 (callback as Callback1<T,K>)(doc.toObject(), req, res as TResponse<K>);
//             }else{
//                 res.status(404).json({error: 'Not Found'} as K);
//             }
//         })
//     }
// }

// const trouter = new CustomRouter()
export const router = express.Router();

/*
 * /quick-meals
 */

// trouter.get('/:product', async (product: Product, req: TRequest, res: TResponse<any>) => {
//     res.json({});
// });

router.get(
  ROUTES.QUICK_MEALS.UNIQUE_PRODUCTS,
  async (
    req: TRequest<any, PaginationQuery>,
    res: TResponse<Awaited<ReturnType<typeof getUniqueProducts>>>,
  ) => {
    const {uid} = res.locals.user!;
    const {date} = req.query;
    res.json(await getUniqueProducts({date, uid}));
  },
);

router.get(
  ROUTES.QUICK_MEALS.GET_MEALS,
  async (
    req: TRequest<any, PaginationQuery>,
    res: TResponse<Awaited<ReturnType<typeof getQuickMeals>>>,
  ) => {
    const {uid} = res.locals.user!;
    const {date} = req.query;
    res.json(await getQuickMeals({date, uid}));
  },
);

router.get(
  ROUTES.QUICK_MEALS.GET_MEAL,
  async (
    req: TRequest<any, {mid: string}>,
    res: TResponse<
      Awaited<ReturnType<typeof getQuickMealInfo>> | ErrorMiddlewareTypeProps
    >,
  ) => {
    const {uid} = res.locals.user!;
    const {mid} = req.query;
    const quickMeal = await getQuickMealInfo({uid, mid});
    if (quickMeal) {
      res.json(quickMeal);
    } else {
      res.status(404).json(ErrorMiddlewareTypes.NOTFOUND);
    }
  },
);

router.post(
  ROUTES.QUICK_MEALS.SAVE_MEAL,
  async (
    req: TRequest<Omit<QuickMealFull, 'imageUrl'>, any, any>,
    res: TResponse<{success: boolean} | ErrorMiddlewareTypeProps>,
  ) => {
    const {uid} = res.locals.user!;
    const bytes = new Uint8Array(req.body.imageData ?? []).length;
    console.log('[SAVING IMAGE OF SIZE] ', bytes, ' BYTES');
    if (bytes > 1024 * 1024 * 4) {
      res.status(400).json(ErrorMiddlewareTypes.IMAGE_TOO_LARGE);
      return;
    }

    res.json({success: await saveQuickMeal({uid, meal: req.body})});
  },
);

router.delete(
  ROUTES.QUICK_MEALS.DELETE_MEAL,
  async (req: TRequest<{mid: string}>, res: TResponse<{success: boolean}>) => {
    const {uid} = res.locals.user!;
    const {mid} = req.body;
    res.json({success: await deleteQuickMeal({uid, mid})});
  },
);
