"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMealsFull = void 0;
const product_1 = require("../database/schema/product");
const product_2 = require("./product");
const getMealsFull = async (meals) => {
    const fullMeals = await Promise.all(meals.map(async (meal) => ({ ...meal, products: (await Promise.all(meal.products.map(async (product) => {
            const savedProduct = await product_1.ProductModel.findById(product.pid).populate('nutrients').exec();
            if (!savedProduct) {
                return product;
            }
            else {
                return (0, product_2.formatProductWithGrams)({ ...savedProduct.toObject(), _id: product._id }, product.quantity);
            }
        }))) })));
    return fullMeals;
};
exports.getMealsFull = getMealsFull;
