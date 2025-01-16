import { _DOC_LIMIT } from "../constants/Types";
import { MealModel } from "../database/schema/meal";
import { Product, ProductDB, ProductDBModel, ProductModel } from "../database/schema/product";
import { QuickMeal, QuickMealFull, QuickMealInfo, QuickMealModel } from "../database/schema/quick_meal";
import { getFileSignedUrl, getFirestoreFile, saveToImageDBAndDoc } from "../libs/images";
import { formatProductWithGrams, getNutrientsGrams, getProductsAggregatedCalories, getProductsAggregatedQuantity } from "../libs/product";

type ProductUnique = ProductDB & {product: Product}
export const getUniqueProducts = async ({ uid, date }: { uid: string, date: string }): Promise<{ products: Product[], date: string }> => {
    const docs: ProductUnique[] = await ProductDBModel.aggregate([
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
            $limit: _DOC_LIMIT,
        },{
            $lookup: {
                from: 'products',
                localField: 'pid',
                foreignField: '_id',
                as: 'product',
            }
        },{
            $unwind: '$product',
        }
    ])
    const newLastDate = docs.last()?.date?.getTime() ?? date;
    const products = docs.map(item => ({...formatProductWithGrams(item.product, 100), date: item.date}));
    return { products: products, date: newLastDate.toString() };
}

export const getQuickMeals = async ({uid, date}: {uid: string, date: string}): Promise<{quickMeals: QuickMealInfo[], date: string}> => {
    const docs = await QuickMealModel.find({uid: uid, date: {$lt: new Date(parseInt(date))}}).sort({date: -1}).limit(_DOC_LIMIT).exec();
    
    const latestDate = docs.last()?.date?.getTime() ?? parseInt(date); 
    const quickMealsFull = await Promise.all(docs.map(async (doc) => {
        const products = await Promise.all(doc.products.map(async (product)=>{
            const productFull = await ProductModel.findById(product.pid).populate('nutrients').exec();
            if(productFull){
                return formatProductWithGrams(productFull.toObject(), product.quantity);
            }else{
                throw new Error('Product not found');
            }
        }));
        return {
            ...doc.toObject(), products: products,
        }
    }));
    const info: QuickMealInfo[] = await Promise.all(quickMealsFull.map(async quickMeal => {
        const info: QuickMealInfo = {
            ...quickMeal,
            imageUrl: await getFileSignedUrl(getFirestoreFile(quickMeal._id)),
            totalEntries: await MealModel.find({quickMealId: quickMeal._id}).countDocuments(),
            totalCalories: getProductsAggregatedCalories(quickMeal.products),
            totalGrams: getProductsAggregatedQuantity(quickMeal.products),
            totalNutrientsGrams: getNutrientsGrams(quickMeal.products),
        };
        return info;
    }) )
    return {quickMeals: info, date: latestDate.toString()};
}

export const getQuickMealInfo = async ({uid, mid}: {uid: string, mid: string}): Promise<{quickMeal: QuickMealInfo} | null> => {
    const doc = await QuickMealModel.findOne({uid: uid, _id: mid}).exec();

    if(doc){
        const quickMeal = doc.toObject();
        const products = await Promise.all(quickMeal.products.map(async (product)=>{
            const productFull = await ProductModel.findById(product.pid).populate('nutrients').exec();
            if(productFull){
                return formatProductWithGrams(productFull.toObject(), product.quantity);
            }else{
                throw new Error('Product not found');
            }
        }));
            const info: QuickMealInfo = {
                ...quickMeal,
                products: products,
                imageUrl: await getFileSignedUrl(getFirestoreFile(quickMeal._id)),
                totalEntries: await MealModel.find({quickMealId: quickMeal._id}).countDocuments(),
                totalCalories: getProductsAggregatedCalories(products),
                totalGrams: getProductsAggregatedQuantity(products),
                totalNutrientsGrams: getNutrientsGrams(products),
            };
        return {quickMeal: info};
    }else{
        return null;
    }
}

export const saveQuickMeal = async ({uid, meal}: {uid: string, meal: Partial<Pick<QuickMealFull, 'imageUrl'>> & Omit<QuickMealFull, 'imageUrl'>}): Promise<boolean> => {
    const productsDb: ProductDB[] = (await Promise.all(meal.products.map(async product => {
        const productdb = await ProductDBModel.findOne({pid: product._id?.padEnd(24, '0')}).exec();
        if(!productdb) {
            const doc = (await ProductModel.create({...product, _id: undefined})).toObject();
            
            return {...await ProductDBModel.create({...doc, quantity: product.quantity, pid: doc._id, addedBy: uid})};
        }
        return {...await ProductDBModel.findOne({pid: product._id}).exec(),quantity: product.quantity};
    }))).filter(product => product!==null) as ProductDB[];
    let doc
    const hasSameImage = meal._id && meal.imageUrl && (!meal.imageData || meal.imageData.length === 0);
    if(meal._id){
        doc = await QuickMealModel.findOne({uid: uid, _id: meal._id}).exec();
        if(doc) {
            await doc.set({...meal,products: productsDb, imageUrl: hasSameImage ? doc.imageUrl : undefined} as QuickMeal).save();
        }else{
            return false;
        }
    }else{
        doc = await QuickMealModel.create({
            ...meal,
            imageData: undefined,
            products: productsDb,
            uid,
        });
    }
    if(hasSameImage){
        return !!doc;
    }else{
        const updatedDoc = await saveToImageDBAndDoc({...doc.toObject(),imageData: meal.imageData});
        return !!updatedDoc;
    }
}


export const deleteQuickMealProduct = async ({uid,mid,pid}: {uid: string, mid: string, pid: string}): Promise<boolean> => {
    const doc = await QuickMealModel.findOne({uid: uid, _id: mid}).exec();
    if(!doc) {
        return false;
    }
    const {products} = doc.toObject();
    const newProducts = products.filter(product => product.pid?.toString() !== pid);
    if(newProducts.length === 0) {
        await doc.deleteOne();
        return true;
    }
    await doc.set({products: newProducts}).save();
    return products.length !== newProducts.length;
}

export const deleteQuickMeal = async ({uid, mid}: {uid: string, mid: string}): Promise<boolean> => {
    const doc = await QuickMealModel.findOne({uid: uid, _id: mid}).exec();
    if(!doc) {
        return false;
    }
    await doc.deleteOne();
    return true;
}