"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../routes/user");
const foods_1 = require("../routes/foods");
const meals_1 = require("../routes/meals");
const info_1 = require("../routes/info");
const quick_meals_1 = require("../routes/quick_meals");
const Routes_1 = require("../constants/Routes");
exports.router = express_1.default.Router();
const version = process.env.API_VERSION ?? 0;
exports.router.get(Routes_1.ROUTES.INDEX, (req, res) => {
    res.json({ api: `v${version}` });
});
exports.router.use(Routes_1.ROUTES.USER.INDEX, user_1.router);
exports.router.use(Routes_1.ROUTES.FOODS.INDEX, foods_1.router);
exports.router.use(Routes_1.ROUTES.MEALS.INDEX, meals_1.router);
exports.router.use(Routes_1.ROUTES.INFO.INDEX, info_1.router);
exports.router.use(Routes_1.ROUTES.QUICK_MEALS.INDEX, quick_meals_1.router);
