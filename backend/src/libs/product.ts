import { MealTypes, ProductTypes } from "../constants/Types";
import { Meal, MealFull, MealType } from "../database/schema/meal";
import { Nutrients, Product, ProductDB, ProductDBModel, ProductModel } from "../database/schema/product";
import { ProductQueryResponse } from "../routes/foods/types/product_apis";
import {  DailyMealsType } from "../routes/meals/types/meals_apis";



export const formatProductsSearch = (data: any): Omit<ProductQueryResponse, 'query'> => {
    const productNames = new Set<string>(data.items.map((item: any) => item.name));
    return {
        products: Array.from(productNames.keys()).map((name: any) => 
        {
            const item = data.items.find((item: any) => item.name === name);
            const nameFormatted = item.name.at(0).toUpperCase() + item.name.slice(1);
            return ({
                name: nameFormatted,
                quantity: item.serving_size_g,
                calories: item.calories,
                type: ProductTypes.INDIVIDUAL_QUERIED,
                nutrients: {
                    'fat': item.fat_total_g,
                    'saturatedFat': item.fat_saturated_g,
                    'protein': item.protein_g,
                    'carbohydrates': item.carbohydrates_total_g,
                    'sugars': item.sugar_g,
                    'sodium': item.sodium_mg,
                    'fiber': item.fiber_g,
                    'calcium': item.calcium_mg,
                    'iron': item.iron_mg,
                    'cholesterol': item.cholesterol_mg,
                    'potassium': item.potassium_mg,
                },
            } as Product);
        }),
    };
}

const findProductName = (data: any): string => {
    if(data.product_name.length > 0){
        return data.product_name;
    }
    if(data.product_name_de.length > 0){
        return data.product_name_de;
    }
    if(data.product_name_en.length > 0){
        return data.product_name_en;
    }
    if(data.product_name_it.length > 0){
        return data.product_name_it;
    }
    return data.product_name;
}

export const formatProductQRCode = (data: any): Product => {
    const {product} = data;
    return {
        qrCode: data.code,
        imageUrl: product.image_front_url,
        type: ProductTypes.SYNTHETIC_SCANNED,
        name: findProductName(product),
        calories: product.nutriments['energy-kcal_serving'] ?? product.nutriments['energy-kcal'],
        // servingSize: parseFloat(product.serving_quantity ?? product.quantity ?? '100'),
        quantity: parseFloat(product.serving_quantity ?? product.quantity  ?? '100'),
        hasServingSize: product.serving_quantity !== undefined,
        nutrients: {
            'fat': product.nutriments['fat'],
            'saturatedFat': product.nutriments['saturated-fat'],
            'protein': product.nutriments['proteins'],
            'carbohydrates': product.nutriments['carbohydrates'],
            'sugars': product.nutriments['sugars'],
            'sodium': product.nutriments['sodium'],
            'calcium': product.nutriments['calcium'],
            'iron': product.nutriments['iron'],
            'cholesterol': product.nutriments['cholesterol'],
            'potassium': product.nutriments['potassium'],
            'fiber': product.nutriments['fiber'],
            'polyols': product.nutriments['polyols'],
        },
    } as Product;
}

export const getMealType = (date: Date): MealType => {
    const hours = date.getHours();
    if(hours < 6) {
        return MealTypes.DINNER;
    }
    if (hours < 12) { //[6-11]
        return MealTypes.BREAKFAST;
    }
    if (hours < 13) { //[12-13]
        return MealTypes.BRUNCH;
    }
    if (hours < 17) { //[13-16]
        return MealTypes.LUNCH;
    }
    if (hours < 20) { //[17-19]
        return MealTypes.SNACK;
    } 
    return MealTypes.DINNER; //[21-5]
}

export const getProductDBMeal = async(meal: MealFull): Promise<Meal> => {
    const {products} = meal;
    let productDbs: ProductDB[] = [];
    for(const product of products) {
        let savedProduct = await ProductModel.findOne({name: product.name});
        let productToPush = null;
        if(!savedProduct){
            savedProduct = await ProductModel.create({...product});
            productToPush = ({...savedProduct.toObject(), pid: savedProduct._id});
        }else{
            productToPush = ({quantity: product.quantity, pid: savedProduct._id});
        }
        const {_id} = await ProductDBModel.create({quantity: product.quantity, pid: savedProduct._id, addedBy: meal.uid});
        productDbs.push({...productToPush, _id: _id});
    }
    return {
        ...meal,
        products: productDbs,
    }
}

export const formatProductWithGrams = (savedProduct: Product, quantity: number): Product => {
    const factor = quantity / savedProduct.quantity;
    const calories = Math.round(savedProduct.calories * factor);
    return {
        ...savedProduct,
        calories,
        nutrients: {
            calcium: Math.round(savedProduct.nutrients.calcium * factor * 100)/100,
            cholesterol: Math.round(savedProduct.nutrients.cholesterol * factor*100)/100,
            fiber: Math.round(savedProduct.nutrients.fiber * factor*100)/100,
            iron: Math.round(savedProduct.nutrients.iron * factor*100)/100,
            potassium: Math.round(savedProduct.nutrients.potassium * factor*100)/100,
            protein: Math.round(savedProduct.nutrients.protein * factor*100)/100,
            sodium: Math.round(savedProduct.nutrients.sodium * factor*100)/100,
            sugars: Math.round(savedProduct.nutrients.sugars * factor*100)/100,
            carbohydrates: Math.round(savedProduct.nutrients.carbohydrates * factor*100)/100,
            fat: Math.round(savedProduct.nutrients.fat * factor*100)/100,
            saturatedFat: Math.round(savedProduct.nutrients.saturatedFat * factor*100)/100,
        },
        quantity: quantity,
    }

}

export const getNutrientsGrams = (product: Product[]): Nutrients => {
    return {
        'fat': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.fat ?? 0), 0)),
        'saturatedFat': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.saturatedFat ?? 0), 0)),
        'protein': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.protein ?? 0), 0)),
        'carbohydrates': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.carbohydrates ?? 0), 0)),
        'sugars': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.sugars ?? 0), 0)),
        'sodium': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.sodium ?? 0), 0)),
        'fiber': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.fiber ?? 0), 0)),
        'calcium': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.calcium ?? 0), 0)),
        'iron': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.iron ?? 0), 0)), 
        'cholesterol': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.cholesterol ?? 0), 0)),
        'potassium': Math.round(product.reduce((acc, product) => acc + (product?.nutrients?.potassium ?? 0), 0)),
    }
}

export const getProductsAggregatedCalories = (products: Product[]) => {
        return Math.round(products.reduce((acc, product) => acc + (product?.calories ?? 0), 0));
}
export const getProductsAggregatedQuantity = (products: Product[]) => {
        return Math.round(products.reduce((acc, product) => acc + (product?.quantity ?? 0), 0));
}

export const getNutrientsPercentage = (product: Product[], totalGrams: number): Nutrients => {
    const nutrients = getNutrientsGrams(product);
    return {
        'fat': Math.round((nutrients['fat'] / totalGrams) * 100),
        'saturatedFat': Math.round((nutrients['saturatedFat'] / totalGrams) * 100),
        'protein': Math.round((nutrients['protein'] / totalGrams) * 100),
        'carbohydrates': Math.round((nutrients['carbohydrates'] / totalGrams) * 100),
        'sugars': Math.round((nutrients['sugars'] / totalGrams) * 100),
        'sodium': Math.round((nutrients['sodium'] / totalGrams) * 100),
        'fiber': Math.round((nutrients['fiber'] / totalGrams) * 100),
        'calcium': Math.round((nutrients['calcium'] / totalGrams) * 100),
        'iron': Math.round((nutrients['iron'] / totalGrams) * 100), 
        'cholesterol': Math.round((nutrients['cholesterol'] / totalGrams) * 100),
        'potassium': Math.round((nutrients['potassium'] / totalGrams) * 100),
    }   
}

export const getTotalNutrients = (meals: DailyMealsType['meals']) => {
    let grams: Nutrients = {} as Nutrients;
    const mealKeys = Object.keys(MealTypes);
    for(const mealKey of mealKeys) {
        const meal = meals[mealKey as MealType];
        if(meal) {
            for(const _key in meal.nutrients_grams){
                const key = _key as keyof Nutrients;
                grams[key] = (grams?.[key] ?? 0) + meal.nutrients_grams[key];
            }
        }
    }
    return {grams};
}