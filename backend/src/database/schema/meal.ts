import { AppDocument } from ".";
import { Schemas } from "../../constants/Schemas";
import { MealTypes } from "../../constants/Types";
import { Product, ProductDB, ProductDBModel } from "./product";
import mongoose from "mongoose";
import { QuickMealModel } from "./quick_meal";

const {Schema} = mongoose;


export interface Meal extends AppDocument{
    date: Date;
    type: MealType;
    products: ProductDB[];
    uid: string;
    quickMealId?: string;
}

export type MealFull = Omit<Meal, 'products'> & {
    products: Product[];
}

export type MealType = keyof typeof MealTypes

const MealSchema = new Schema<Meal>({
    date: {type: Date, default: Date.now},
    type: {type: String, required: true, enum: Object.values(MealTypes)},
    products: [{type: ProductDBModel.schema, ref: Schemas.ProductDB, required: true}],
    uid: {type: String, required: true},
    quickMealId: {type: Schema.Types.ObjectId, ref: Schemas.QuickMeal, required: false, unique: false},
});

export const MealModel = mongoose.model(Schemas.Meal, MealSchema);
