import {Product} from '../../../database/schema/product';

export type ProductQueryRequest = {
  query: string;
};

export type ProductQRCodeRequest = {
  qr_code: string;
};

export type ProductQueryResponse = {
  query: string;
  products: Product[];
};

export type QuickMealQuantityFactor = {
  quantity_factor?: number; // [0-1] percentage (0-100% of total quantity)
};
