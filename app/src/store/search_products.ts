import {create} from 'zustand';
import {queryIsValid, recalculateProcuctNutrition} from '../libs/products';
import {queryProducts} from '../network/product';
import {Product, ProductSearch} from '../types/nutrition';

type SearchProductsState = ProductSearch & {
  selectedProducts: Product[];
  noResults: boolean;
  setQuery: (query: string) => void;
  selectProduct: (product: Product, removeExisting?: boolean) => void;
  fetchProducts: (query: string) => Promise<boolean>;
  clear: () => void;
  selectNewQuantity: (product: Product, quantity: number) => void;
  setProducts: (products: Product[]) => void;
};

export const useSearchProducts = create<SearchProductsState>(set => ({
  query: '',
  products: [],
  noResults: false,
  selectedProducts: [],
  selectNewQuantity: (product: Product, quantity: number) =>
    set(state => {
      state.selectProduct(product);
      recalculateProcuctNutrition(product, quantity);
      state.selectProduct(product);
      return {};
    }),
  setProducts: (products: Product[]) => {
    set({
      products,
      noResults: products.length === 0,
      selectedProducts: products,
    });
  },
  selectProduct: (product, removeExisting = true) =>
    set(state => {
      const exists = state.selectedProducts.some(p => p.name === product.name);
      if (!removeExisting && exists) {
        return {
          selectedProducts: [...state.selectedProducts],
        };
      } else if (exists) {
        return {
          selectedProducts: [
            ...state.selectedProducts.filter(p => p.name !== product.name),
          ],
        };
      } else {
        return {selectedProducts: [...state.selectedProducts, product]};
      }
    }),
  clear: () =>
    set({query: '', products: [], selectedProducts: [], noResults: true}),
  setQuery: (query: string) => set({query}),
  fetchProducts: async (query: string) => {
    if (!queryIsValid(query)) {
      return false;
    }
    const res = await queryProducts(query);
    if (!res) {
      set({query: query, noResults: true});
      return false;
    }
    set(state => ({
      query: res.query,
      products: [
        ...state.selectedProducts.filter(
          item => !res.products.some(i => i.name === item.name),
        ),
        ...res.products,
      ],
      selectedProducts: [
        ...state.selectedProducts.filter(
          item => !res.products.some(i => i.name === item.name),
        ),
        ...res.products,
      ],
      noResults: res.products.length === 0,
    }));
    return res.products.length !== 0;
  },
}));
export const getSelectedProductsSorted = () => {
  const {selectedProducts} = useSearchProducts();
  return {
    selectedProducts: selectedProducts.sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
  };
};
