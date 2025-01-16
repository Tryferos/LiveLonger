import React, {FC} from 'react';
import {Image} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppBorderRadius, AppSpace} from '../../../constants/values';
import {QuickMealInfo} from '../../../types/nutrition';
type Props = QuickMealInfo;
export const QuickMealCardHeader: FC<Props> = ({
  name,
  totalCalories,
  totalGrams,
  totalEntries,
  imageUrl,
}) => {
  return (
    <Row gap="2xs">
      <Row className="p-1" style={{borderRadius: AppBorderRadius.normal}}>
        <Image
          source={{uri: imageUrl}}
          // source={{
          //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8MMXfSGN-sffUAXkOywDJjXkRf62KuuoTQ&s',
          // }}
          style={{
            width: AppSpace['2xl'],
            height: '110%',
            borderRadius: AppBorderRadius.normal,
          }}
        />
      </Row>
      <Column className="justify-evenly py-1 w-full" gap="3xs">
        <CustomText
          ellipsizeMode="tail"
          className="w-[82%]"
          numberOfLines={1}
          color="white"
          font="wotfardMedium"
          size="lg">
          {name.upperFirst()}
        </CustomText>
        <Row gap="2xs" className="items-center">
          <Row gap="4xs" className="items-end">
            <CustomText color="gray200" size="sm">
              {totalCalories}
            </CustomText>
            <CustomText color="gray200" size="xs">
              kcal
            </CustomText>
          </Row>
          <CustomIcon icon="circle" size="4xs" color="gray200" />
          <Row gap="4xs" className="items-end">
            <CustomText color="gray200" size="sm">
              {totalGrams}
            </CustomText>
            <CustomText color="gray200" size="xs">
              g
            </CustomText>
          </Row>
          {totalEntries > 0 && (
            <>
              <CustomIcon icon="circle" size="4xs" color="gray200" />
              <Row gap="4xs" className="items-end">
                <CustomText color="gray200" size="sm">
                  {totalEntries}
                </CustomText>
                <CustomText color="gray200" size="xs">
                  time{totalEntries > 1 ? 's' : ''} cooked
                </CustomText>
              </Row>
            </>
          )}
        </Row>
      </Column>
    </Row>
  );
};
