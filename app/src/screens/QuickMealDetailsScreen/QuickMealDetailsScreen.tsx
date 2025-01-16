import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Column} from '../../components/elements/Column';
import {CustomText} from '../../components/elements/CustomText';
import {ImageScreen} from '../../components/wrappers/ImageScreenWrapper';
import {wait} from '../../libs/utils';
import {getQuickMeal} from '../../network/quick_meals';
import useLoader from '../../store/loader';
import {useAppNavigation, useAppRouteParams} from '../../types/navigation';
import {QuickMealInfo} from '../../types/nutrition';
import {QuickMealDetailsButtons} from './components/QuickMealDetailsButtons';
import {QuickMealsDetailsProducts} from './components/QuickMealDetailsProducts';
import {QuickMealsDetailsNutrients} from './components/QuickMealsDetailsNutrients';
import {QuickMealDetailShimmer} from './shimmers/QuickMealDetailsShimmer';

export const QuickMealDetailsScreen = () => {
  const {quickMealId, ...rest} =
    useAppRouteParams<'Quick_Meal_Details_Screen'>();
  const [renderProgressBars, setRenderProgressBars] = useState(false);
  const [quickMeal, setQuickMeal] = useState<QuickMealInfo>();
  const navigation = useAppNavigation();
  const {isLoading: _isLoading} = useLoader();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (quickMealId) {
          const res = await getQuickMeal(quickMealId, true);
          if (res) {
            setQuickMeal(res.quickMeal);
          }
        } else if (rest) {
          await wait(350);
          //@ts-ignore
          setQuickMeal({
            ...rest,
          });
        }
      })();
    }, [quickMealId]),
  );

  const isLoading = !quickMeal && _isLoading;
  return (
    <ImageScreen
      onScrollEnabled={value => {
        setRenderProgressBars(value);
      }}
      onBack={() => navigation.goBack()}
      useScrollView={true}
      title={'Your Quick Meal'}
      src={
        quickMeal?.imageUrl ??
        'https://firebasestorage.googleapis.com/v0/b/livelonger-c956d.appspot.com/o/671bc3d709d7b802a4ceba41.png?alt=media&token=77b8f292-42fb-44ef-871c-ba92e9557609'
      }>
      {isLoading ? (
        <QuickMealDetailShimmer />
      ) : (
        quickMeal && (
          <Column gap="sm" className="">
            <CustomText font="wotfardMedium" size="lg" color="black">
              {quickMeal.name}
            </CustomText>
            <QuickMealsDetailsProducts products={quickMeal.products} />
            <QuickMealsDetailsNutrients
              {...quickMeal}
              renderProgressBars={renderProgressBars}
            />
            <QuickMealDetailsButtons />
          </Column>
        )
      )}
    </ImageScreen>
  );
};
