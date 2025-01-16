import {FC, useCallback, useEffect, useState} from 'react';
import React from 'react';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {useUserAuthentication} from '../../store/authentication';
import {DailyProgressTotal} from './components/DailyProgressTotal';
import {useFocusEffect} from '@react-navigation/native';
import {getDailyMeals} from '../../network/meals';
import {DailyMealsType} from '../../types/nutrition';
import {DailyMealsInfo} from './components/DailyMealsInfo';
import {CalendarDayPicker} from './components/CalendarDayPicker';
import {getDateDayStart} from '../../libs/dates';
import {Column} from '../../components/elements/Column';
import {Spacer} from '../../components/elements/Spacer';
import {MealCreationButtons} from './components/MealCreationButtons';
import {setNutritionPresets} from '../../network/user';
import {CustomText} from '../../components/elements/CustomText';
import {ProgramList} from './components/ProgramList';
import {Row} from '../../components/elements/Row';
import {AppSpace} from '../../constants/values';
import {MealPlannerEntry} from './components/MealPlannerEntry';
import {useCalendarDate} from '../../store/calendar_dates';

export const HomeScreen: FC = () => {
  const [dailyMeals, setDailyMeals] = useState<DailyMealsType | null>(null);
  const {selectedDate} = useCalendarDate();
  const {user} = useUserAuthentication();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const meals = await getDailyMeals(selectedDate);
        setDailyMeals(meals);
      })();
    }, [user, selectedDate]),
  );
  useEffect(() => {
    setDailyMeals(null);
  }, [selectedDate]);

  return (
    <ScreenWrapper
      gap="md"
      style={{paddingTop: AppSpace.sm}}
      showUserHeader
      title="">
      <CalendarDayPicker />
      <DailyProgressTotal dailyMeals={dailyMeals} />
      <DailyMealsInfo dailyMeals={dailyMeals} selectedDate={selectedDate} />
      <MealCreationButtons />
      <MealPlannerEntry />
      <ProgramList />
      <Spacer size="lg" />
    </ScreenWrapper>
  );
};
