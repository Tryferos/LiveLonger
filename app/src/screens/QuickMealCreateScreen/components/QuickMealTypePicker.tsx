import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {MealTypes} from '../../../constants/types';
import {AppBorderRadius} from '../../../constants/values';
import {MealType} from '../../../types/nutrition';
type Props = {
  selectedType: MealType;
  onChangeType: (type: MealType) => void;
};
export const QuickMealTypePicker: FC<Props> = ({
  selectedType,
  onChangeType,
}) => {
  return (
    <Column gap="2xs" className="mt-2">
      <CustomText>{'When is this meal for?'}</CustomText>
      <ScrollView
        className="gap-2"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {Object.keys(MealTypes).map((mealType, i) => {
          const isSelected = selectedType === mealType;
          return (
            <Row
              onPress={() => onChangeType(mealType as MealType)}
              style={{borderRadius: AppBorderRadius.normal}}
              className="px-5 py-4"
              backgroundColor={isSelected ? 'mainLight' : 'white'}
              key={mealType + i}>
              <CustomText color={isSelected ? 'white' : 'black'}>
                {mealType.upperFirst()}
              </CustomText>
            </Row>
          );
        })}
      </ScrollView>
    </Column>
  );
};
