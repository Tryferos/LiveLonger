import React from 'react';
import {Image} from 'react-native';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius} from '../../../constants/values';
import {getMealTypeIcon} from '../../../libs/meal';
import {getProductIconFromName} from '../../../libs/products';
import {MealProductProps} from '../../DailyAnalysisScreen/components/MealProduct';

export const LargeImageHeader = ({
  name,
  mealType,
  imageUrl,
}: Pick<MealProductProps, 'name' | 'mealType' | 'imageUrl'>) => {
  return (
    <Row
      style={{borderRadius: AppBorderRadius.rounded}}
      backgroundColor="lightOrange"
      className="w-full h-[25vh] items-center justify-center">
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: AppBorderRadius.rounded,
          }}
        />
      ) : (
        <CustomText size="7xl" color="black">
          {getProductIconFromName(name) ?? getMealTypeIcon(mealType)}
        </CustomText>
      )}
    </Row>
  );
};
