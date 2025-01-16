import express from "express"
import { router as UserRoute } from '../routes/user';
import { router as FoodsRouter } from '../routes/foods';
import {router as MealsRouter} from '../routes/meals';
import {router as InfoRouter} from '../routes/info';
import {router as QuickMealsRouter} from '../routes/quick_meals';
import { TRequest, TResponse } from "../types";
import { ROUTES } from "../constants/Routes";

export const router = express.Router();

const version = process.env.API_VERSION ?? 0;

router.get(ROUTES.INDEX, (req: TRequest, res: TResponse<{api: string}>) => {
    res.json({ api: `v${version}` });
});

router.use(ROUTES.USER.INDEX, UserRoute);

router.use(ROUTES.FOODS.INDEX, FoodsRouter);

router.use(ROUTES.MEALS.INDEX, MealsRouter);

router.use(ROUTES.INFO.INDEX, InfoRouter);

router.use(ROUTES.QUICK_MEALS.INDEX, QuickMealsRouter);
