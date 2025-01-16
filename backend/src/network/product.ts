import Network from "."
import { foodsApi } from "../constants/Network";
import { _DOC_LIMIT } from "../constants/Types";
import { Product, ProductModel } from "../database/schema/product"
import {  formatProductQRCode, formatProductsSearch } from "../libs/product"
import { ProductQueryResponse } from "../routes/foods/types/product_apis";

export const getProductsQueryFood = async (query: string): Promise<ProductQueryResponse | null> => {
    const res = await Network.get<Omit<ProductQueryResponse, 'query'>>({url: `${foodsApi.SEARCH_FOOD}`, formatData: formatProductsSearch, params: {query: query}});
    if(!res) {
        return null;
    }
    const data: ProductQueryResponse = {...res, query: query};
    return data;
}

export const getProductQRCode = async (qr_code: string): Promise<Product | null> => {
    const productFromMongo = await ProductModel.findOne({qrCode: qr_code});
    if(productFromMongo) {
        return productFromMongo.toObject();
    }
    const url = `${foodsApi.SEARCH_QR_CODE}/${qr_code}`;
    const res = await Network.get<Product>({url: url, formatData: formatProductQRCode});
    if(!res || !res.calories || !res.nutrients.protein || !res.nutrients.fat || !res.nutrients.carbohydrates) {
        return null;
    }
    const doc = await ProductModel.create(res);
    return {_id: doc._id,...res};
}