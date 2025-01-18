import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {Row} from '../../../components/elements/Row';
import {AppSpace} from '../../../constants/values';
import {getPreset, useNutritionPresets} from '../../../store/nutrition_presets';
import {useAppNavigation} from '../../../types/navigation';
import {
  DailyMealType,
  DailyQuickMealType,
  MealType,
  Product,
  QuickMeal,
  isDailyMealItem,
  isDailyQuickMealItem,
} from '../../../types/nutrition';
import {MealProduct} from './MealProduct';
import {MealTypeHeader} from './MealTypeHeader';

export const MealsTypeList: FC<DailyMealType | DailyQuickMealType> = props => {
  const {calories, type} = props;
  const {presets} = useNutritionPresets();
  const factor = getPreset(type).factor;
  const targetCalories = factor * presets?.daily_calories!;
  const progress = calories / targetCalories;

  const navigation = useAppNavigation();

  const navigateToProductInfo = (product: Product) => {
    navigation.navigate('Meal_Product_Info_Screen', {
      ...product,
      mealType: type,
    });
  };

  const navigateToQuickMeal = (quickMeal: QuickMeal) => {
    navigation.navigate('Quick_Meal_Details_Screen', {
      ...quickMeal,
      quickMealId: quickMeal._id ?? '',
    });
  };

  return (
    <Column className="">
      <MealTypeHeader
        progress={progress}
        calories={calories.toFixed(0)}
        type={type}
      />
      <Row
        className="absolute left-[14] top-[36] h-[calc(100%-5%)] w-[3px] rounded-full"
        backgroundColor="gray200"
      />
      <Column
        style={{
          marginTop: AppSpace.xs,
          marginLeft: AppSpace.lg,
        }}
        gap="2xs">
        {isDailyMealItem(props) &&
          props.products.map((product, i) => (
            <MealProduct
              onPress={() => navigateToProductInfo(product)}
              key={`${product._id} ` + i}
              {...product}
              mealType={type as MealType}
            />
          ))}
        {isDailyQuickMealItem(props) &&
          props.quickMeals.map((quickMeal, index) => {
            return (
              <MealProduct
                key={`${quickMeal.date} - ${index}`}
                onPress={() => navigateToQuickMeal(quickMeal)}
                canBeSelected={false}
                calories={quickMeal.totalCalories}
                name={quickMeal.name}
                nutrients={
                  quickMeal.totalNutrientsGrams ?? props.nutrients_grams
                }
                imageUrl={quickMeal.imageUrl}
                quantity={quickMeal.totalGrams}
                type="INDIVIDUAL_QUERIED"
                mealType={type}
              />
            );
          })}
      </Column>
    </Column>
  );
};
