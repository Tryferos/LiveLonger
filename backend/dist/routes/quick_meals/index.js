"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Routes_1 = require("../../constants/Routes");
const quick_meals_1 = require("../../network/quick_meals");
const ErrorHandling_1 = require("../../constants/ErrorHandling");
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
exports.router = express_1.default.Router();
/*
    * /quick-meals
*/
// trouter.get('/:product', async (product: Product, req: TRequest, res: TResponse<any>) => {
//     res.json({});
// });
exports.router.get(Routes_1.ROUTES.QUICK_MEALS.UNIQUE_PRODUCTS, async (req, res) => {
    const { uid } = res.locals.user;
    const { date } = req.query;
    res.json(await (0, quick_meals_1.getUniqueProducts)({ date, uid }));
});
exports.router.get(Routes_1.ROUTES.QUICK_MEALS.GET_MEALS, async (req, res) => {
    const { uid } = res.locals.user;
    const { date } = req.query;
    res.json(await (0, quick_meals_1.getQuickMeals)({ date, uid }));
});
exports.router.get(Routes_1.ROUTES.QUICK_MEALS.GET_MEAL, async (req, res) => {
    const { uid } = res.locals.user;
    const { mid } = req.query;
    const quickMeal = await (0, quick_meals_1.getQuickMealInfo)({ uid, mid });
    if (quickMeal) {
        res.json(quickMeal);
    }
    else {
        res.status(404).json(ErrorHandling_1.ErrorMiddlewareTypes.NOTFOUND);
    }
});
exports.router.post(Routes_1.ROUTES.QUICK_MEALS.SAVE_MEAL, async (req, res) => {
    const { uid } = res.locals.user;
    res.json({ success: await (0, quick_meals_1.saveQuickMeal)({ uid, meal: req.body }) });
});
exports.router.delete(Routes_1.ROUTES.QUICK_MEALS.DELETE_MEAL, async (req, res) => {
    const { uid } = res.locals.user;
    const { mid } = req.body;
    res.json({ success: await (0, quick_meals_1.deleteQuickMeal)({ uid, mid }) });
});
