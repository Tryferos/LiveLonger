import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Row} from '../../components/elements/Row';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {AppSpace} from '../../constants/values';
import {getDailyMeals} from '../../network/meals';
import {useCalendarDate} from '../../store/calendar_dates';
import {useSearchProducts} from '../../store/search_products';
import {useAppNavigation} from '../../types/navigation';
import {DailyMealsType} from '../../types/nutrition';
import {CalendarDayPicker} from '../HomeScreen/components/CalendarDayPicker';
import {CaloryProgress} from './components/CaloryProgress';
import {HeaderDate} from './components/HeaderDate';
import {MealsTypesList} from './components/MealsTypesList';
import {CaloryProgressShimmer} from './shimmers/CaloryProgressShimmer';
import {MealsTypesListShimmer} from './shimmers/MealsTypesListShimmer';

export const DailyAnalysisScreen: FC = () => {
  const {selectedDate} = useCalendarDate();
  const [dailyMeals, setDailyMeals] = useState<DailyMealsType | null>();
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useAppNavigation();
  const {selectedProducts, clear} = useSearchProducts();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (selectedDate) {
          await fetchMeals(selectedDate);
        }
      })();
    }, [selectedDate]),
  );
  useFocusEffect(
    useCallback(() => {
      clear();
    }, []),
  );

  useEffect(() => {
    if (selectedDate) {
      (async () => {
        await fetchMeals(selectedDate);
      })();
    }
  }, [selectedDate]);

  const fetchMeals = async (date: Date) => {
    setIsFetching(true);
    const meals = await getDailyMeals(date);

    setIsFetching(false);
    setDailyMeals(meals);
  };

  const caloriesConsumed = dailyMeals?.totalCalories;

  const handleBack = () => {
    navigation.navigate('Main_Home');
  };

  const navigateToQuickMeals = () => {
    navigation.navigate('Quick_Meal_Create_Screen', {
      quickMeal: undefined,
    });
  };

  return (
    <ScreenWrapper
      onBack={handleBack}
      bottomChildren={
        caloriesConsumed && dailyMeals ? (
          <CaloryProgress caloriesConsumed={caloriesConsumed} />
        ) : isFetching ? (
          <CaloryProgressShimmer />
        ) : null
      }
      scrollView={false}
      title={''}
      gap="2xs"
      onTrailIconPress={navigateToQuickMeals}
      trailingIcon={selectedProducts.length > 0 ? 'add' : undefined}
      style={{
        paddingTop: 0,
      }}>
      <Row>
        <CalendarDayPicker gap="3xs" />
      </Row>
      <HeaderDate />
      {dailyMeals ? (
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={{
            marginTop: AppSpace['2xs'],
          }}
          className="pb-4">
          <MealsTypesList meals={dailyMeals.meals} />
        </ScrollView>
      ) : (
        <MealsTypesListShimmer />
      )}
    </ScreenWrapper>
  );
};
