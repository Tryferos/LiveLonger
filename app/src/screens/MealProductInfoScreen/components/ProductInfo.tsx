import React, {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {MealProductProps} from '../../DailyAnalysisScreen/components/MealProduct';

type Props = Pick<MealProductProps, 'name' | 'calories' | 'quantity'>;

export const ProductInfo: FC<Props> = ({calories, name, quantity}) => {
  return (
    <Row className="justify-between">
      <Column className="w-[70%]" gap="3xs">
        <CustomText
          numberOfLines={1}
          ellipsizeMode="tail"
          font="wotfardMedium"
          size="2xl">
          {name}
        </CustomText>
        <CustomText font="wotfardRegular" color="gray400" size="md">
          {'Nutrition values'}
        </CustomText>
      </Column>
      <Column className="w-[30%] items-end justify-between" gap="3xs">
        <CustomText font="wotfardMedium" size="xl">
          {`${quantity}g`}
        </CustomText>
        <CustomText font="wotfardRegular" color="gray400" size="sm">
          {`${calories} kcal`}
        </CustomText>
      </Column>
    </Row>
  );
};
