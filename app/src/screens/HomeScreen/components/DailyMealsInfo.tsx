import React, {FC, Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {useAppNavigation} from '../../../types/navigation';
import {
  DailyMealsType,
  MealType,
  isDailyMealItem,
  isDailyQuickMealItem,
} from '../../../types/nutrition';
import {DailyMealsInfoShimmer} from '../shimmers/DailyMealsInfoShimmer';
import {MealProductInfoCard} from './MealProductInfoCard';
import {MealTypeCard} from './MealTypeCard';

type TodayCardProps = {
  dailyMeals: DailyMealsType | null;
  selectedDate: Date | null;
};

export const DailyMealsInfo: FC<TodayCardProps> = ({dailyMeals}) => {
  const ref = useRef<ScrollView>(null);

  const [selectedMeal, setSelectedMeal] = useState<MealType | 'all'>();

  const navigation = useAppNavigation();

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    ref.current.scrollTo({animated: true, x: 0});
  }, [ref, dailyMeals, selectedMeal]);

  const mealsValues = useMemo(() => {
    if (dailyMeals) {
      return Object.values(dailyMeals.meals).filter(item =>
        isDailyMealItem(item)
          ? item.products.length > 0
          : isDailyQuickMealItem(item)
          ? item.quickMeals
          : false,
      );
    }
    return [];
  }, [dailyMeals?.meals]);

  useEffect(() => {
    setSelectedMeal(mealsValues.length > 1 ? 'all' : mealsValues.at(0)?.type);
  }, [dailyMeals, mealsValues]);

  const selectedMealValue = useMemo(() => {
    const meal = mealsValues.find(item => item.type === selectedMeal);
    return selectedMeal === 'all' ? mealsValues : meal ? [meal] : [];
  }, [mealsValues, selectedMeal]);

  const onPress = () => {
    navigation.navigate('Daily_Analysis_Screen', {
      fromAddType: 'INDIVIDUAL_QUERIED',
    });
  };

  if (!dailyMeals) {
    return <DailyMealsInfoShimmer />;
  } else if (mealsValues.length === 0) {
    return <NoMealsInfo />;
  } else {
    return (
      <Column
        className="px-4"
        gap="3xs"
        style={{marginHorizontal: -AppSpace.xs}}>
        <Header />
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pb-0 pt-4">
          {mealsValues.length > 1 && (
            <MealTypeCard
              onPress={() => setSelectedMeal('all')}
              key={'all'}
              selected={selectedMeal === 'all'}
              meal={'all'}
            />
          )}
          {mealsValues.map(item => {
            return (
              <MealTypeCard
                onPress={() => setSelectedMeal(item.type)}
                key={item.type}
                selected={selectedMeal === item.type}
                meal={item.type}
              />
            );
          })}
        </Animated.ScrollView>
        <Row className="w-full mt-2">
          <ScrollView
            decelerationRate={0}
            snapToAlignment="start"
            snapToInterval={Dimensions.get('screen').width - AppSpace.md * 2}
            ref={ref}
            showsHorizontalScrollIndicator={false}
            horizontal
            className="">
            {selectedMealValue.map((meal, index) => {
              return (
                <Fragment
                  key={
                    isDailyQuickMealItem(meal)
                      ? `${meal._id} - ${index}`
                      : meal.type
                  }>
                  {isDailyMealItem(meal) &&
                    meal.products.map((product, index) => {
                      return (
                        <MealProductInfoCard
                          key={index}
                          onPress={onPress}
                          type={meal.type}
                          name={product.name}
                          quantity={product.quantity}
                          calories={product.calories}
                          nutrients={product.nutrients}
                          imageUrl={product.imageUrl}
                        />
                      );
                    })}
                  {isDailyQuickMealItem(meal)
                    ? meal.quickMeals.map((quickMeal, index) => {
                        return (
                          <MealProductInfoCard
                            key={`${index} - ${quickMeal._id} - ${quickMeal.date}`}
                            imageUrl={quickMeal.imageUrl}
                            onPress={onPress}
                            type={meal.type}
                            name={quickMeal.name}
                            quantity={quickMeal.totalGrams}
                            calories={quickMeal.totalCalories}
                            nutrients={quickMeal.totalNutrientsGrams}
                          />
                        );
                      })
                    : null}
                </Fragment>
              );
              // if (isDailyMealItem(meal)) {
              //   return meal.products.map((product, index) => {
              //     return (
              //       <MealProductInfoCard
              //         key={index}
              //         onPress={onPress}
              //         type={meal.type}
              //         name={product.name}
              //         quantity={product.quantity}
              //         calories={product.calories}
              //         nutrients={product.nutrients}
              //         imageUrl={product.imageUrl}
              //       />
              //     );
              //   });
              // } else {
              //   return (
              //     <MealProductInfoCard
              //       imageUrl={meal.quickMeal.imageUrl}
              //       key={meal._id}
              //       onPress={onPress}
              //       type={meal.type}
              //       name={meal.quickMeal.name}
              //       quantity={meal.quantity}
              //       calories={meal.calories}
              //       nutrients={meal.nutrients_grams}
              //     />
              //   );
              // }
            })}
          </ScrollView>
        </Row>
      </Column>
    );
  }
};

const NoMealsInfo: FC = () => {
  return (
    <Row
      className="px-4 py-4 justify-between items-center"
      backgroundColor="white"
      style={{borderRadius: AppBorderRadius.normal}}
      shadow="shadowBottom">
      <CustomIcon colorOpacity="bb" size="lg" icon="info" color="main" />
      <CustomText className="text-start w-[85%]" size="sm">
        {
          'You have yet to consume food. Follow the instructions below to explore your options!'
        }
      </CustomText>
      <View />
    </Row>
  );
};

const Header: FC = () => {
  return (
    <CustomText font="wotfardMedium" size="lg" color="black">
      {'Daily Meals'}
    </CustomText>
  );
};
