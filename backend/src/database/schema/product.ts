
import { AppDocument } from ".";
import { Schemas } from "../../constants/Schemas";
import { ProductTypes } from "../../constants/Types";

import mongoose from "mongoose";
const {Schema} = mongoose;
const {ObjectId} = Schema;

/*
* Produt
*/
export interface Product extends AppDocument{
    type: ProductType;
    date?: Date;
    calories: number;
    name: string;
    servingSize?: number;
    quantity: number;
    nutrients: Nutrients; 
    // From QR Code API
    imageUrl?: string;
    qrCode?: string;
    hasServingSize: boolean;
    // From Foods API
}


export type ProductDB = Pick<Product, '_id' | 'quantity' | 'date'> & {pid?: string} & {addedBy?: string};

export type Nutrients = {[key in NutientKeys]: number};

export type ProductType = keyof typeof ProductTypes;

type NutientKeys = 'fat' | 'saturatedFat' | 'protein' | 'carbohydrates' | 'sugars' | 'sodium' | 'fiber' | 'calcium' | 'iron' | 'cholesterol' | 'potassium';

const ProductSchema = new Schema<Product>({
    date: {type: Date, default: Date.now},
    qrCode: {type: String, required: false, unique: false},
    imageUrl: {type: String, required: false},
    quantity: {type: Number, required: true},
    type: {type: String, required: true, enum: Object.values(ProductTypes), default: ProductTypes.INDIVIDUAL_QUERIED},
    name: {type: String, required: true},
    calories: {type: Number, required: true},
    servingSize: {type: Number, required: false},
    hasServingSize: {type: Boolean, required: true, default: false},
    nutrients: {type: Object, required: true},
});

export const ProductModel = mongoose.model(Schemas.Product, ProductSchema);

const ProductDBSchema = new Schema<ProductDB>({
    quantity: {type: Number, required: true},
    pid: {type: Schema.Types.ObjectId, ref: Schemas.Product, required: true, unique: false},
    addedBy: {type: String, required: false},
    date: {type: Date, default: Date.now},
});

export const ProductDBModel = mongoose.model(Schemas.ProductDB, ProductDBSchema);