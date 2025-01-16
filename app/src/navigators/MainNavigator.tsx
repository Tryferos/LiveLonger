import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {MainNavigatorScreenNames, screenOptions} from '../constants/navigation';
import {DailyAnalysisScreen} from '../screens/DailyAnalysisScreen/DailyAnalysisScreen';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {IndividualProductScreen} from '../screens/IndivudualProductScreen/IndivudualProductScreen';
import {IntroductionScreen} from '../screens/IntroductionScreen/IntroductionScreen';
import {MealProductInfoScreen} from '../screens/MealProductInfoScreen/MealProductInfoScreen';
import {ProductScreen} from '../screens/QRProductScreen/QRProductScreen';
import {QuickMealCreateScreen} from '../screens/QuickMealCreateScreen/QuickMealCreateScreen';
import {QuickMealDetailsScreen} from '../screens/QuickMealDetailsScreen/QuickMealDetailsScreen';
import {QuickMealRepositoryScreen} from '../screens/QuickMealRepositoryScreen/QuickMealRepositoryScreen';
import {ScannerScreen} from '../screens/ScannerScreen/ScannerScreen';
import {ScreenError} from '../screens/ScreenError/ScreenError';
import {SearchScreen} from '../screens/SearchScreen/SearchScreen';
import {SignInScreen} from '../screens/SignInScreen/SignInScreen';

const Stack = createStackNavigator();

const MainNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Introduction_Screen'}
      screenOptions={screenOptions}>
      <Stack.Screen<MainNavigatorScreenNames>
        options={{title: 'My home'}}
        name={'Main_Home'}
        component={HomeScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'QR_Product_Screen'}
        component={ProductScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Search_Product_Screen'}
        component={SearchScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Individual_Product_Screen'}
        component={IndividualProductScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Daily_Analysis_Screen'}
        component={DailyAnalysisScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Scanner_Screen'}
        component={ScannerScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Screen_Error'}
        component={ScreenError}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'SignIn_Screen'}
        component={SignInScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Introduction_Screen'}
        initialParams={{isEditing: false}}
        component={IntroductionScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Meal_Product_Info_Screen'}
        component={MealProductInfoScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Quick_Meal_Create_Screen'}
        component={QuickMealCreateScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Quick_Meal_Details_Screen'}
        component={QuickMealDetailsScreen}
      />
      <Stack.Screen<MainNavigatorScreenNames>
        name={'Quick_Meal_Repository_Screen'}
        component={QuickMealRepositoryScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
