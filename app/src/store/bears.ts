import {create} from 'zustand';
import {ProductInfo} from '../types/nutrition';
import {fetchProduct} from '../network/product';

interface BearState {
  bears: number;
  product: ProductInfo | null;
  updateBears: (b: number) => void;
  removeAllBears: () => void;
  increasePopulation: () => void;
  fetchProduct: (code: string) => Promise<void>;
}

export const useBearStore = create<BearState>()(set => ({
  bears: 0,
  product: null,
  increasePopulation: () => set(state => ({bears: state.bears + 1})),
  removeAllBears: () => set({bears: 0}),
  updateBears: newBears => set({bears: newBears}),
  fetchProduct: async code => {
    // const data = await fetchProduct({code});
    set({product: {}});
  },
}));
