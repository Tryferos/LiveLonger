import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useKeyboardOpenedNavigation} from '../hooks/useKeyboardOpenedNavigation';
import {MealProductProps} from '../screens/DailyAnalysisScreen/components/MealProduct';
import {Product, ProductType, QuickMeal, QuickMealInfo} from './nutrition';

export const useAppNavigation = (): StackNavigationProp<
  NavigationParamList,
  keyof NavigationParamList
> => {
  const navigation =
    useNavigation<
      StackNavigationProp<NavigationParamList, keyof NavigationParamList>
    >();
  const {keyboardWrapperOnPress} = useKeyboardOpenedNavigation();
  return {
    ...navigation,
    navigate: (routeName: keyof NavigationParamList, params?: any) => {
      keyboardWrapperOnPress(() => {
        navigation.navigate(routeName, params);
      });
    },
    push: (routeName: keyof NavigationParamList, params?: any) => {
      keyboardWrapperOnPress(() => {
        navigation.push(routeName, params);
      });
    },
    goBack: () => {
      keyboardWrapperOnPress(() => {
        navigation.goBack();
      });
    },
  };
};

export const useAppRoute = <T extends keyof NavigationParamList>() => {
  return useRoute<RouteProp<NavigationParamList, T>>();
};

export const useAppRouteParams = <T extends keyof NavigationParamList>() => {
  return useAppRoute<T>().params! ?? {};
};

export type NavigationParamList = {
  ['QR_Product_Screen']: ProductScreenType;
  ['Individual_Product_Screen']: undefined;
  ['Product_Screen']: undefined;
  ['Main_Home']: undefined;
  ['Search_Product_Screen']: SearchProductScreenType | undefined;
  ['Daily_Analysis_Screen']: DailyAnalysisScreenType;
  ['Scanner_Screen']: ScannerScreenType;
  ['Screen_Error']: ScreenErrorType;
  ['SignIn_Screen']: undefined;
  ['Introduction_Screen']: IntroductionScreenType;
  ['Meal_Product_Info_Screen']: MealProductInfoScreenType;
  ['Quick_Meal_Create_Screen']: QuickMealCreateScreenType;
  ['Quick_Meal_Repository_Screen']: undefined;
  ['Quick_Meal_Details_Screen']: QuickMealDetailsScreenType;
};

export type QuickMealDetailsScreenType = Partial<QuickMealInfo> & {
  quickMealId?: string;
};

export type QuickMealCreateScreenType = {
  quickMeal?: QuickMeal;
};

export type ScannerScreenType = {
  addToQuickMeal?: boolean;
};

export type SearchProductScreenType = {
  selectedProducts: Product[];
};

export type MealProductInfoScreenType = MealProductProps & {
  quickMealId?: string;
};

export type IntroductionScreenType = {
  isEditing: boolean;
};

export type ScreenErrorType = {
  reason?: string;
};

export type DailyAnalysisScreenType = {
  fromAddType: ProductType;
};

export type ProductScreenType = {
  code: number;
  addToQuickMeal?: boolean;
};
