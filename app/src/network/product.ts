import Network from '.';
import {API_ROUTES} from '../constants/network';
import {Product, ProductSearch, ProductUnique} from '../types/nutrition';

export const fetchProduct = async ({
  qrCode,
}: Pick<Product, 'qrCode'>): Promise<Product | null> => {
  const response = await Network.get<Product>({
    url: API_ROUTES.FOODS.FOODS_QR_CODE.replace('<QR_CODE>', qrCode ?? ''),
  });
  return response;
};

export const queryProducts = async (
  query: string,
): Promise<ProductSearch | null> => {
  const response = await Network.get<ProductSearch>({
    url: `${API_ROUTES.FOODS.FOODS_SEARCH}?query=${query}`,
  });
  return response;
};

export const getUniqueProducts = async (date?: number) => {
  const response = await Network.get<ProductUnique>({
    url: `${API_ROUTES.QUICK_MEALS.UNIQUE_PRODUCTS}`,
    params: {
      date: (date ?? new Date().getTime()).toString(),
    },
    formatData: (data: ProductUnique) => ({
      ...data,
      products: data.products.map(product => ({
        ...product,
        date: new Date(product.date ?? new Date()),
      })),
    }),
  });
  return response;
};
