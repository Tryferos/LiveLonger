import {create} from 'zustand';

type LoaderState = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  setLoading: (isLoading: boolean) => void;
};

const useLoader = create<LoaderState>(set => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set({isLoading}),
  showLoader: () => {
    set({isLoading: true});
  },
  hideLoader: () => set({isLoading: false}),
}));

export default useLoader;
