


import { AppDocument } from ".";
import { Schemas } from "../../constants/Schemas";
import { MealTypes } from "../../constants/Types";
import { AggregatedNutrientsType } from "../../routes/meals/types/meals_apis";
import { Meal } from "./meal";
import { Product, ProductDB, ProductDBModel } from "./product";
import mongoose, { Schema, model } from "mongoose";


export interface QuickMeal extends Omit<Meal, 'quickMealId'>{
    name: string;
    imageUrl: string;
    imageData?: number[];
}

export interface QuickMealFull extends QuickMeal{
    products: Product[];
}

export interface QuickMealInfo extends Omit<QuickMealFull, 'imageData'>, AggregatedNutrientsType{
    totalEntries: number;
    totalGrams: number;
} 

const QuickMealSchema = new Schema<Omit<QuickMeal, 'imageData'>>({
    date: {type: Date, default: Date.now},
    type: {type: String, required: true, enum: Object.values(MealTypes)},
    products: [{type: ProductDBModel.schema, ref: Schemas.ProductDB, required: true}],
    imageUrl: {type: String, required: false},
    uid: {type: String, required: true},
    name: {type: String, required: true},
})

export const QuickMealModel = model(Schemas.QuickMeal, QuickMealSchema);

