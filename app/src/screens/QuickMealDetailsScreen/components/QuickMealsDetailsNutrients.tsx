import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {ProgressBar} from '../../../components/elements/ProgressBar';
import {Row} from '../../../components/elements/Row';
import {NutrimentIcons} from '../../../constants/nutrition';
import {AppBorderRadius, AppColors} from '../../../constants/values';
import {NutientKeys, QuickMealInfo} from '../../../types/nutrition';
type Props = {
  renderProgressBars: boolean;
} & Pick<QuickMealInfo, 'totalCalories' | 'totalGrams' | 'totalNutrientsGrams'>;
export const QuickMealsDetailsNutrients: FC<Props> = ({
  renderProgressBars,
  totalCalories,
  totalGrams,
  totalNutrientsGrams,
}) => {
  return (
    <Column gap="2xs">
      <Row className="justify-between">
        <CustomText font="wotfardMedium" color="gray">
          {'Nutrition info'}
        </CustomText>
        <Row className="items-center" gap="3xs">
          <CustomText font="wotfardMedium" size="md">
            {totalCalories}
          </CustomText>
          <CustomText size="sm" color="gray">
            kcal
          </CustomText>
          <CustomIcon
            style={{marginHorizontal: 2}}
            icon="circle"
            color="gray400"
            size="4xs"
          />
          <CustomText font="wotfardMedium" size="md">
            {totalGrams}
          </CustomText>
          <CustomText size="sm" color="gray">
            g
          </CustomText>
        </Row>
      </Row>
      <Column gap="2xs" className="w-full">
        {Object.keys(NutrimentIcons)
          .map(key => {
            const nutrientKey = key.toCamelCase() as NutientKeys;
            const grams =
              totalNutrientsGrams?.[
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
                totalGrams={totalGrams}
                renderProgressBars={renderProgressBars}
              />
            );
          })}
      </Column>
    </Column>
  );
};
type NutritionInfoProps = {
  grams: number;
  measure: string;
  iconKey: string;
  totalGrams: number;
  renderProgressBars?: boolean;
};
export const NutritionPercentageInfo: FC<NutritionInfoProps> = ({
  grams,
  iconKey: key,
  measure,
  totalGrams,
  renderProgressBars = true,
}) => {
  const percentage = (measure === 'g' ? grams : grams / 1000).toPercentage(
    totalGrams,
  );
  if (measure === 'mg' && grams < 10) {
    return null;
  } else if (measure === 'g' && grams < 1) {
    return null;
  } else {
    return (
      <Row
        style={{
          borderWidth: 1,
          borderColor: AppColors.gray200,
          borderRadius: AppBorderRadius.normal,
        }}
        gap="2xs"
        className="justify-start px-2 py-2">
        <Row
          style={{
            borderRadius: AppBorderRadius.normal,
          }}
          shadow="shadowBottom"
          className="p-2"
          backgroundColor="lightOrange">
          <CustomText size="lg">{NutrimentIcons[key]}</CustomText>
        </Row>
        <Column
          gap="2xs"
          className="justify-center"
          style={{
            width: Dimensions.get('window').width * 0.7 - 4,
          }}>
          <Row className="justify-between">
            <CustomText size="lg">{key}</CustomText>
            <Row gap="2xs" className="items-end">
              {percentage > 0.0 && (
                <CustomText size="xs" color="gray400">
                  ({percentage.formatPercentage()})
                </CustomText>
              )}
              <CustomText color="gray" size="sm">{`${grams.toFixed(
                1,
              )}`}</CustomText>
              <CustomText
                className="-ml-[6px]"
                color="gray400"
                size="sm">{`${measure}`}</CustomText>
            </Row>
          </Row>
          {percentage >= 0.1 && (
            <ProgressBar
              color={
                percentage < 0.1
                  ? 'error'
                  : percentage < 0.3
                  ? 'errorLight'
                  : percentage < 0.55
                  ? 'warning'
                  : percentage < 0.8
                  ? 'successLight'
                  : 'success'
              }
              progress={renderProgressBars ? percentage : 0}
              widthFactor={0.75}
            />
          )}
        </Column>
      </Row>
    );
  }
};
