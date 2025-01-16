import { Product } from "../../../database/schema/product";


export type ProductQueryRequest = {
    query: string;
}

export type ProductQRCodeRequest = {
    qr_code: string;
}

export type ProductQueryResponse = {
    query: string;
    products: Product[];
}