"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuickMeal = exports.deleteQuickMealProduct = exports.saveQuickMeal = exports.getQuickMealInfo = exports.getQuickMeals = exports.getUniqueProducts = void 0;
const Types_1 = require("../constants/Types");
const meal_1 = require("../database/schema/meal");
const product_1 = require("../database/schema/product");
const quick_meal_1 = require("../database/schema/quick_meal");
const images_1 = require("../libs/images");
const product_2 = require("../libs/product");
const getUniqueProducts = async ({ uid, date }) => {
    const docs = await product_1.ProductDBModel.aggregate([
        {
            $match: {
                addedBy: uid,
                date: {
                    $lt: new Date(parseInt(date)),
                }
            }
        },
        {
            $group: {
                _id: '$pid',
                doc: { $first: '$$ROOT' },
            }
        },
        {
            $replaceRoot: {
                newRoot: "$doc",
            },
        },
        {
            $sort: {
                date: -1
            }
        },
        {
            $limit: Types_1._DOC_LIMIT,
        }, {
            $lookup: {
                from: 'products',
                localField: 'pid',
                foreignField: '_id',
                as: 'product',
            }
        }, {
            $unwind: '$product',
        }
    ]);
    const newLastDate = docs.last()?.date?.getTime() ?? date;
    const products = docs.map(item => ({ ...(0, product_2.formatProductWithGrams)(item.product, 100), date: item.date }));
    return { products: products, date: newLastDate.toString() };
};
exports.getUniqueProducts = getUniqueProducts;
const getQuickMeals = async ({ uid, date }) => {
    const docs = await quick_meal_1.QuickMealModel.find({ uid: uid, date: { $lt: new Date(parseInt(date)) } }).sort({ date: -1 }).limit(Types_1._DOC_LIMIT).exec();
    const latestDate = docs.last()?.date?.getTime() ?? parseInt(date);
    const quickMealsFull = await Promise.all(docs.map(async (doc) => {
        const products = await Promise.all(doc.products.map(async (product) => {
            const productFull = await product_1.ProductModel.findById(product.pid).populate('nutrients').exec();
            if (productFull) {
                return (0, product_2.formatProductWithGrams)(productFull.toObject(), product.quantity);
            }
            else {
                throw new Error('Product not found');
            }
        }));
        return {
            ...doc.toObject(), products: products,
        };
    }));
    const info = await Promise.all(quickMealsFull.map(async (quickMeal) => {
        const info = {
            ...quickMeal,
            imageUrl: await (0, images_1.getFileSignedUrl)((0, images_1.getFirestoreFile)(quickMeal._id)),
            totalEntries: await meal_1.MealModel.find({ quickMealId: quickMeal._id }).countDocuments(),
            totalCalories: (0, product_2.getProductsAggregatedCalories)(quickMeal.products),
            totalGrams: (0, product_2.getProductsAggregatedQuantity)(quickMeal.products),
            totalNutrientsGrams: (0, product_2.getNutrientsGrams)(quickMeal.products),
        };
        return info;
    }));
    return { quickMeals: info, date: latestDate.toString() };
};
exports.getQuickMeals = getQuickMeals;
const getQuickMealInfo = async ({ uid, mid }) => {
    const doc = await quick_meal_1.QuickMealModel.findOne({ uid: uid, _id: mid }).exec();
    if (doc) {
        const quickMeal = doc.toObject();
        const products = await Promise.all(quickMeal.products.map(async (product) => {
            const productFull = await product_1.ProductModel.findById(product.pid).populate('nutrients').exec();
            if (productFull) {
                return (0, product_2.formatProductWithGrams)(productFull.toObject(), product.quantity);
            }
            else {
                throw new Error('Product not found');
            }
        }));
        const info = {
            ...quickMeal,
            products: products,
            imageUrl: await (0, images_1.getFileSignedUrl)((0, images_1.getFirestoreFile)(quickMeal._id)),
            totalEntries: await meal_1.MealModel.find({ quickMealId: quickMeal._id }).countDocuments(),
            totalCalories: (0, product_2.getProductsAggregatedCalories)(products),
            totalGrams: (0, product_2.getProductsAggregatedQuantity)(products),
            totalNutrientsGrams: (0, product_2.getNutrientsGrams)(products),
        };
        return { quickMeal: info };
    }
    else {
        return null;
    }
};
exports.getQuickMealInfo = getQuickMealInfo;
const saveQuickMeal = async ({ uid, meal }) => {
    const productsDb = (await Promise.all(meal.products.map(async (product) => {
        const productdb = await product_1.ProductDBModel.findOne({ pid: product._id?.padEnd(24, '0') }).exec();
        if (!productdb) {
            const doc = (await product_1.ProductModel.create({ ...product, _id: undefined })).toObject();
            return { ...await product_1.ProductDBModel.create({ ...doc, quantity: product.quantity, pid: doc._id, addedBy: uid }) };
        }
        return { ...await product_1.ProductDBModel.findOne({ pid: product._id }).exec(), quantity: product.quantity };
    }))).filter(product => product !== null);
    let doc;
    const hasSameImage = meal._id && meal.imageUrl && (!meal.imageData || meal.imageData.length === 0);
    if (meal._id) {
        doc = await quick_meal_1.QuickMealModel.findOne({ uid: uid, _id: meal._id }).exec();
        if (doc) {
            await doc.set({ ...meal, products: productsDb, imageUrl: hasSameImage ? doc.imageUrl : undefined }).save();
        }
        else {
            return false;
        }
    }
    else {
        doc = await quick_meal_1.QuickMealModel.create({
            ...meal,
            imageData: undefined,
            products: productsDb,
            uid,
        });
    }
    if (hasSameImage) {
        return !!doc;
    }
    else {
        const updatedDoc = await (0, images_1.saveToImageDBAndDoc)({ ...doc.toObject(), imageData: meal.imageData });
        return !!updatedDoc;
    }
};
exports.saveQuickMeal = saveQuickMeal;
const deleteQuickMealProduct = async ({ uid, mid, pid }) => {
    const doc = await quick_meal_1.QuickMealModel.findOne({ uid: uid, _id: mid }).exec();
    if (!doc) {
        return false;
    }
    const { products } = doc.toObject();
    const newProducts = products.filter(product => product.pid?.toString() !== pid);
    if (newProducts.length === 0) {
        await doc.deleteOne();
        return true;
    }
    await doc.set({ products: newProducts }).save();
    return products.length !== newProducts.length;
};
exports.deleteQuickMealProduct = deleteQuickMealProduct;
const deleteQuickMeal = async ({ uid, mid }) => {
    const doc = await quick_meal_1.QuickMealModel.findOne({ uid: uid, _id: mid }).exec();
    if (!doc) {
        return false;
    }
    await doc.deleteOne();
    return true;
};
exports.deleteQuickMeal = deleteQuickMeal;
