import React, {FC} from 'react';
import {Spacer} from '../../../components/elements/Spacer';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomButton} from '../../HomeScreen/components/MealCreationButtons';
import {AppBorderRadius} from '../../../constants/values';

export const IntroductionHeader: FC = () => {
  return (
    <>
      <Spacer size="sm" />
      <CustomText color="main" font="wotfardSemibold" size="2xl">
        {'Welcome to LiveLonger'}
      </CustomText>
      <Spacer size="sm" />
      <CustomText
        className="text-center"
        color="black"
        font="wotfardMedium"
        size="3xl">
        {'Take your diet to the next level!'}
      </CustomText>
      <Spacer size="md" />
      <Row
        className="justify-between w-full px-4 py-4 items-center"
        backgroundColor="mainLight"
        bgOpacity="33"
        style={{borderRadius: AppBorderRadius.normal}}>
        <CustomIcon icon="info" color="main" size="sm" />
        <CustomText font="wotfardMedium" size="sm" color="black">
          {'Help us calculate your daily calory intake'}
        </CustomText>
        <Row />
      </Row>
    </>
  );
};
