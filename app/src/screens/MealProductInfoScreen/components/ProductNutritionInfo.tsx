import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {NutrimentIcons} from '../../../constants/nutrition';
import {NutientKeys} from '../../../types/nutrition';
import {MealProductProps} from '../../DailyAnalysisScreen/components/MealProduct';
import {NutritionPercentageInfo} from '../../QuickMealDetailsScreen/components/QuickMealsDetailsNutrients';

type Props = Pick<MealProductProps, 'nutrients' | 'quantity'>;

export const ProductNutritionInfo: FC<Props> = ({nutrients, quantity}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      className="h-[33vh]">
      <Column gap="2xs" className="w-full">
        {Object.keys(NutrimentIcons)
          .map(key => {
            const nutrientKey = key.toCamelCase() as NutientKeys;
            const grams =
              nutrients?.[
                nutrientKey === ('carbs' as NutientKeys)
                  ? 'carbohydrates'
                  : nutrientKey
              ] ?? 0;
            const measure = [
              'potassium',
              'iron',
              'sodium',
              'calcium',
              'cholesterol',
            ].includes(nutrientKey)
              ? 'mg'
              : 'g';
            return {grams: grams, measure: measure, key: key};
          })
          .sort(
            (a, b) =>
              (b.measure === 'mg' ? b.grams / 1000 : b.grams) -
              (a.measure === 'mg' ? a.grams / 1000 : a.grams),
          )
          .map(({grams, measure, key}) => {
            return (
              <NutritionPercentageInfo
                iconKey={key}
                key={key}
                grams={grams}
                measure={measure}
                totalGrams={quantity}
              />
            );
          })}
      </Column>
    </ScrollView>
  );
};
