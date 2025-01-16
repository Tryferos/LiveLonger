import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {create} from 'zustand';
import auth from '@react-native-firebase/auth';
import useLoader from './loader';
import {wait} from '../libs/utils';
import {useNutritionPresets} from './nutrition_presets';

type AuthenticationState = {
  init: () => () => void;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
} & (
  | {
      user: FirebaseAuthTypes.User;
      idToken: string;
    }
  | {
      user: null;
      idToken: null;
    }
);

export const useUserAuthentication = create<AuthenticationState>(set => ({
  user: null,
  idToken: null,
  signInWithGoogle: async () => {
    try {
      useLoader.getState().showLoader();
      const {idToken: token} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(token);
      const userCredentials = await auth().signInWithCredential(
        googleCredential,
      );
      const idToken = await userCredentials.user.getIdToken();
      set({user: userCredentials.user, idToken: idToken});
      useNutritionPresets.getState().init();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      useLoader.getState().hideLoader();
    }
  },
  signOut: async () => {
    //! Using firebase auth to sign out signs out simply the user
    //! next time the user tries to sign in he will be signed in automatically
    // await auth().signOut();
    //! Using Google sign out signs out the user completely, so
    //! next time the user tries to sign in he will be prompted to sign in and choose an account
    useLoader.getState().showLoader();
    await wait(1000);
    await GoogleSignin.signOut();
    useLoader.getState().hideLoader();
    set({user: null, idToken: null});
  },
  init: () => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    });
    return auth().onAuthStateChanged(async user => {
      const hasChanged = user !== useUserAuthentication.getState().user;
      if (user) {
        set({user: user, idToken: await user.getIdToken()});
      } else {
        set({user: null, idToken: null});
      }
      if (hasChanged) {
        await useNutritionPresets.getState().init();
      }
    });
  },
}));
