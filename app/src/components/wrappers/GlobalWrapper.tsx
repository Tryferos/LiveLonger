import {useFocusEffect} from '@react-navigation/native';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Modal} from 'react-native';
import {useUserAuthentication} from '../../store/authentication';
import {useNetWorkInfo} from '../../store/netinfo';
import {useNutritionPresets} from '../../store/nutrition_presets';
import {useSelectedProgram} from '../../store/selected_program';
import {useUserSettings} from '../../store/settings';
import {useAppNavigation} from '../../types/navigation';
import {AppAlerts} from '../AppAlerts/AppAlerts';
import {Loader} from '../elements/Loader';
import {NoConnectionModalBody} from './NoConnectionModal';

export const GlobalWrapper: FC<PropsWithChildren> = ({children}) => {
  const navigation = useAppNavigation();
  const {isConnected, listen, unsubscribe} = useNetWorkInfo();
  const {init: initSettings, introduction, setIntroduction} = useUserSettings();
  const {init: initAuthentication, user} = useUserAuthentication();
  const {init: initPresets, presets} = useNutritionPresets();
  const {init: initProgram} = useSelectedProgram();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    listen();
    const unsubscribeAuth = initAuthentication();
    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await initSettings();
        const presets = await initPresets();
        await initProgram();
        setHasInitialized(true);
        if (!presets && user) {
          setIntroduction(true);
        }
      })();
    }, [user]),
  );

  // useEffect(() => {
  //   (async () => {
  //     await initSettings();
  //     const presets = await initPresets();
  //     await initProgram();
  //     setHasInitialized(true);
  //     if (!presets && user) {
  //       setIntroduction(true);
  //     }
  //   })();
  // }, [user]);

  useEffect(() => {
    if (!user && hasInitialized) {
      navigation.navigate('SignIn_Screen');
    }
  }, [user, hasInitialized, introduction]);

  useEffect(() => {
    if (!presets && hasInitialized && introduction && user) {
      navigation.navigate('Introduction_Screen', {isEditing: false});
    } else {
    }
  }, [presets, hasInitialized, user, introduction]);
  return (
    //* {children} must be the first component of the wrapper
    //* the later a component is added, the more z-index it has
    <>
      {children}
      <Modal visible={!isConnected && hasInitialized}>
        <NoConnectionModalBody />
      </Modal>
      <AppAlerts />
      <Loader />
    </>
  );
};
