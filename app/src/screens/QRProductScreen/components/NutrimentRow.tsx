import React, {FC} from 'react';
import {Row} from '../../../components/elements/Row';
import {NutrimentProps} from './NutrimentBox';
import {CustomText} from '../../../components/elements/CustomText';
import {NutrimentIcons} from '../../../constants/nutrition';

export const NutrimentRow: FC<NutrimentProps> = ({
  title,
  value,
  percentage,
}) => {
  return (
    <Row
      gap="xs"
      className="border-b-[1px] pb-2 justify-between border-gray-300">
      <Row gap="2xs">
        <Row className="items-center justify-start" gap="2xs">
          <CustomText size="sm" className="" color="error">
            {NutrimentIcons[title]}
          </CustomText>
          <CustomText size="sm" color="black" font="wotfardMedium">
            {title}
          </CustomText>
        </Row>
        <CustomText color="gray" size="xs">
          {percentage}
        </CustomText>
      </Row>
      <CustomText color="black" size="sm" style={{}}>
        {value}
      </CustomText>
    </Row>
  );
};
