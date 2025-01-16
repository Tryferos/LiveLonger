import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

export type MainNavigatorScreenNames =
  | 'Main_Home'
  | 'QR_Product_Screen'
  | 'Individual_Product_Screen'
  | 'Search_Product_Screen'
  | 'Daily_Analysis_Screen'
  | 'Scanner_Screen'
  | 'Screen_Error'
  | 'SignIn_Screen'
  | 'Introduction_Screen'
  | 'Meal_Product_Info_Screen'
  | 'Quick_Meal_Create_Screen'
  | 'Quick_Meal_Repository_Screen'
  | 'Quick_Meal_Details_Screen';

export const InitialScreenNames = [
  'Introduction_Screen',
  'SignIn_Screen',
  'Main_Home',
];

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

  cardStyle: {},
};
