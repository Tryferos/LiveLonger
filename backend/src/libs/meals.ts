import { Meal, MealFull } from "../database/schema/meal";
import { Product, ProductModel } from "../database/schema/product";
import { formatProductWithGrams } from "./product";


export const getMealsFull = async (meals: Meal[]): Promise<MealFull[]> => {
    const fullMeals: MealFull[] = await Promise.all(meals.map(async meal => 
        ({...meal, products: (await Promise.all( meal.products.map(async product => {
            const savedProduct = await ProductModel.findById(product.pid).populate('nutrients').exec();
            if(!savedProduct) {
                return product;
            }else{
                return formatProductWithGrams({...savedProduct.toObject(), _id: product._id}, product.quantity);
            }
        }))) as Product[]} as MealFull)));
    return fullMeals;
}
