import {
  NetInfoSubscription,
  addEventListener,
  fetch,
} from '@react-native-community/netinfo';
import {create} from 'zustand';
import {wait} from '../libs/utils';
import useLoader from './loader';

type NetInfoProps = {
  isConnected: boolean;
  subscription: NetInfoSubscription | null;
  listen: () => void;
  unsubscribe: () => void;
  checkConnection: () => Promise<void>;
};

export const useNetWorkInfo = create<NetInfoProps>()(set => ({
  isConnected: false,
  subscription: null,
  listen: () => {
    const unsubscribe = addEventListener(state => {
      set({isConnected: state.isConnected ?? false});
    });
    set({subscription: unsubscribe});
  },
  unsubscribe: () => {
    set(state => {
      if (!state.subscription) {
        return state;
      }
      state.subscription();
      return {subscription: null};
    });
  },
  checkConnection: async () => {
    useLoader.getState().showLoader();
    await wait(500);
    const res = await fetch();
    if (res.isConnected) {
      set({isConnected: true});
    }
    useLoader.getState().hideLoader();
  },
}));
