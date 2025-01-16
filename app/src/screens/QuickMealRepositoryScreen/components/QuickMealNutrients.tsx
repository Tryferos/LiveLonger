import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {NutrimentIcons} from '../../../constants/nutrition';
import {AppBorderRadius} from '../../../constants/values';
import {NutientKeys, QuickMealInfo} from '../../../types/nutrition';

type Props = QuickMealInfo;
export const QuickMealNutrients: FC<Props> = ({totalNutrientsGrams}) => {
  return (
    <Column gap="2xs">
      <CustomText font="wotfardMedium" size="md" color="gray200">
        {'Nutrients'}
      </CustomText>
      <Row gap="2xs" className="items-center flex-wrap">
        {Object.keys(NutrimentIcons).map(key => {
          const nutrientKey = key.toCamelCase() as NutientKeys;
          const grams = totalNutrientsGrams?.[nutrientKey] ?? 0;
          const measure = [
            'potassium',
            'iron',
            'sodium',
            'calcium',
            'cholesterol',
          ].includes(nutrientKey)
            ? 'mg'
            : 'g';
          if (measure === 'mg' && grams < 10) {
            return null;
          } else if (measure === 'g' && grams < 1) {
            return null;
          } else {
            return (
              <Row className="items-center w-[47%]" gap="3xs" key={key}>
                <Row
                  backgroundColor="lightOrange"
                  className="p-1"
                  style={{borderRadius: AppBorderRadius.normal}}>
                  <CustomText size="lg">{NutrimentIcons[key]}</CustomText>
                </Row>
                <CustomText
                  numberOfLines={1}
                  className="w-[80%]"
                  ellipsizeMode="tail"
                  color="gray200"
                  size="md">
                  {grams} {measure} {key}
                </CustomText>
              </Row>
            );
          }
        })}
      </Row>
    </Column>
  );
};
