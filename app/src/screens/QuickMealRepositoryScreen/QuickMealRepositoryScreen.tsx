import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Spacer} from '../../components/elements/Spacer';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {getQuickMeals} from '../../network/quick_meals';
import useLoader from '../../store/loader';
import {useAppNavigation} from '../../types/navigation';
import {QuickMealInfo} from '../../types/nutrition';
import {NoQuickMeals} from './components/NoQuickMeals';
import {QuickMealAddButton} from './components/QuickMealAddButton';
import {QuickMealCard} from './components/QuickMealCard';
import {QuickMealsCardsShimmer} from './shimmers/QuickMealCardsShimmer';

export const QuickMealRepositoryScreen = () => {
  const [quickMeals, setQuickMeals] = useState<QuickMealInfo[]>([]);
  const navigation = useAppNavigation();
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const listRef = useRef<FlatList<QuickMealInfo>>(null);
  const {isLoading} = useLoader();

  const sortedQuickMeals = useMemo(() => {
    return quickMeals.descending('date').reduce((acc, meal) => {
      if (!acc.some(item => item._id === meal._id)) {
        acc.push(meal);
      }
      return acc;
    }, [] as QuickMealInfo[]);
  }, [quickMeals]);

  useFocusEffect(
    useCallback(() => {
      setHasMoreToLoad(true);
      setQuickMeals([]);
      (async () => {
        const meals = await getQuickMeals(sortedQuickMeals.last()?.date, false);
        setQuickMeals(meals?.quickMeals ?? []);
      })();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (listRef && listRef.current && sortedQuickMeals.length > 0) {
        listRef.current?.scrollToIndex({index: 0, animated: true});
      }
    }, [listRef, sortedQuickMeals]),
  );

  const fetchQuickMeals = async () => {
    if (hasMoreToLoad) {
      const meals = await getQuickMeals(sortedQuickMeals.last()?.date, false);
      if (meals && meals.quickMeals.length > 0) {
        setQuickMeals(prev => [...prev, ...meals.quickMeals]);
      } else {
        setHasMoreToLoad(false);
      }
    }
  };

  return (
    <ScreenWrapper
      bottomChildren={<QuickMealAddButton />}
      onBack={() => {
        navigation.navigate('Main_Home');
      }}
      scrollView={false}
      style={{paddingBottom: 0}}
      title="Your Meal Repository">
      {isLoading && sortedQuickMeals.length === 0 && hasMoreToLoad ? (
        <QuickMealsCardsShimmer />
      ) : sortedQuickMeals.length > 0 ? (
        <FlatList
          ref={listRef}
          onEndReached={fetchQuickMeals}
          data={sortedQuickMeals}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => item._id ?? `${i}`}
          renderItem={({item}) => (
            <>
              <QuickMealCard {...item} />
              <Spacer size="sm" />
            </>
          )}
        />
      ) : (
        <NoQuickMeals />
      )}
    </ScreenWrapper>
  );
};
