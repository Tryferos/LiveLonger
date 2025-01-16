import React, {FC} from 'react';
import {Image} from 'react-native';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppColors, AppSpace} from '../../../constants/values';
import {getProductIconFromName} from '../../../libs/products';
import {QuickMealInfo} from '../../../types/nutrition';

export const ProductIcon: FC<Pick<QuickMealInfo, 'imageUrl' | 'name'>> = ({
  imageUrl,
  name,
}) => {
  return (
    <>
      {imageUrl ? (
        <Row
          style={{
            backgroundColor: AppColors.lightOrange,
            borderRadius: AppBorderRadius.normal,
          }}
          className="py-1 px-1">
          <Image
            style={{
              width: AppSpace.lg,
              height: AppSpace.lg,
            }}
            source={{
              uri: imageUrl,
            }}
          />
        </Row>
      ) : (
        <CustomText
          size="xl"
          className="py-[8px] px-[6px]"
          style={{
            backgroundColor: AppColors.lightOrange,
            borderRadius: AppBorderRadius.normal,
          }}>
          {getProductIconFromName(name)}
        </CustomText>
      )}
    </>
  );
};
