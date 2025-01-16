import React from 'react';
import {Column} from '../../components/elements/Column';
import {ScreenWrapper} from '../../components/wrappers/ScreenWrapper';
import {useAppRouteParams} from '../../types/navigation';
import {LargeImageHeader} from './components/LargeImageHeader';
import {ProductButtons} from './components/ProductButtons';
import {ProductInfo} from './components/ProductInfo';
import {ProductNutritionInfo} from './components/ProductNutritionInfo';

export const MealProductInfoScreen = () => {
  const {mealType, imageUrl, name, calories, quantity, nutrients} =
    useAppRouteParams<'Meal_Product_Info_Screen'>();

  return (
    <ScreenWrapper bottomChildren={<ProductButtons />} scrollView={false}>
      <Column gap="2xs" className="flex-1">
        <LargeImageHeader mealType={mealType} imageUrl={imageUrl} name={name} />
        <ProductInfo name={name} calories={calories} quantity={quantity} />
        <ProductNutritionInfo nutrients={nutrients} quantity={quantity} />
      </Column>
    </ScreenWrapper>
  );
};
