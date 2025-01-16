import React, {FC, Fragment} from 'react';
import {Dimensions} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {MealType, Nutrients} from '../../../types/nutrition';
import {MealProductImage} from '../../DailyAnalysisScreen/components/MealProductImage';

type MealProductInfoCardProps = {
  onPress: () => void;
  type: MealType;
  imageUrl?: string;
  name: string;
  quantity: number;
  calories: number;
  nutrients: Nutrients;
};
export const MealProductInfoCard: FC<MealProductInfoCardProps> = ({
  calories,
  name,
  nutrients,
  onPress,
  quantity,
  type,
  imageUrl,
}) => {
  return (
    <Row
      onPress={onPress}
      className="px-4 py-4"
      backgroundColor="mainLight"
      gap="xs"
      style={{
        width: Dimensions.get('screen').width - AppSpace.md * 2,
        borderRadius: AppBorderRadius.rounded,
        marginRight: AppSpace['2xs'],
      }}>
      <MealProductImage mealType={type} imageUrl={imageUrl} name={name} />
      <Column gap="3xs">
        <CustomText font="wotfardMedium" color="white">
          {name.length > 20 ? name : `${quantity}g ${name}`}
        </CustomText>
        <CustomText
          className="-mt-1"
          color="gray200"
          size="sm"
          font="wotfardRegular">
          {`${name.length > 20 ? `${quantity}g ` : ''}${calories} kcal`}
        </CustomText>
        <Row gap="3xs" className="items-center">
          {[
            ['Carbs', 'carbohydrates'],
            ['Protein', 'protein'],
            ['Fat', 'fat'],
          ].map(([title, field], i) => {
            const grams = nutrients[field as keyof Nutrients];
            return (
              <Fragment key={i}>
                <Row gap="4xs" className="items-end">
                  <CustomText size="sm" color="gray200">
                    {title}:
                  </CustomText>
                  <CustomText size="sm" color="white">
                    {grams.toFixed(grams >= 10 ? 0 : 1)}g
                  </CustomText>
                </Row>
                {i < 2 && (
                  <CustomIcon color="gray200" icon="circle" size={'4xs'} />
                )}
              </Fragment>
            );
          })}
        </Row>
      </Column>
    </Row>
  );
};
