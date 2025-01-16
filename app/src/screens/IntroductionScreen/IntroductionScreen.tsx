import {FC, useCallback, useEffect} from 'react';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {Column} from '../../components/elements/Column';
import {useNutritionPresets} from '../../store/nutrition_presets';
import {
  useAppNavigation,
  useAppRoute,
  useAppRouteParams,
} from '../../types/navigation';
import {CustomText} from '../../components/elements/CustomText';
import {Spacer} from '../../components/elements/Spacer';
import {IntroductionHeader} from './components/IntroductionHeader';
import {PresetsFields} from './components/PresetsFields';
import {Dimensions} from 'react-native';
import {AppSpace} from '../../constants/values';
import {useFocusEffect} from '@react-navigation/native';

export const IntroductionScreen: FC = () => {
  const {presets} = useNutritionPresets();
  const navigation = useAppNavigation();
  const {isEditing} = useAppRouteParams<'Introduction_Screen'>();
  useFocusEffect(
    useCallback(() => {
      if (presets && !isEditing) {
        navigation.navigate('Main_Home');
      }
    }, [presets, isEditing]),
  );
  return (
    <ScreenWrapper scrollView={false}>
      <Column className="items-center px-0 h-full">
        <IntroductionHeader />
        <PresetsFields />
      </Column>
    </ScreenWrapper>
  );
};
