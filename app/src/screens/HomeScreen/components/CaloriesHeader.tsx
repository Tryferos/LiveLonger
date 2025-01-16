import {FC, useMemo} from 'react';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {useNutritionPresets} from '../../../store/nutrition_presets';
import {getTotalCalories} from '../../../libs/products';
import {getSelectedProgram} from '../../../store/selected_program';
import {AppBorderRadius} from '../../../constants/values';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {MiniCard} from '../../../components/organisms/MiniCard';
import {InfoCard} from '../../../components/organisms/InfoCard';
import {useCalories} from '../../../hooks/useCalories';
import {MORE_CALORIES_CONSUMED} from '../../../constants/nutrition';

type CaloriesHeaderProps = {
  totalCalories: number;
};
export const CaloriesHeader: FC<CaloriesHeaderProps> = ({totalCalories}) => {
  const {presets} = useNutritionPresets();
  const {getRemainingCalories} = useCalories();
  const {selectedProgram, extraCalories: extraKCal} = getSelectedProgram();
  const remaining = getRemainingCalories({caloriesConsumed: totalCalories});
  const dailyCalories = ((presets?.daily_calories ?? 0) + extraKCal).toFixed(0);
  if (remaining < MORE_CALORIES_CONSUMED) {
    return (
      <InfoCard icon="info" iconColor="warning">
        <Row className="flex-wrap w-[90%] justify-start">
          <CustomText>{`You are`}</CustomText>
          <CustomText
            color="warning"
            font="wotfardMedium">{` ${remaining.absolute()} kcal `}</CustomText>
          <CustomText>{`over your daily limit`}</CustomText>
        </Row>
      </InfoCard>
    );
  } else if (remaining > 0) {
    return (
      <Row gap="2xs" className="items-end">
        <Row gap="3xs" className="items-end">
          <CustomText
            size="lg"
            font="wotfardMedium">{`${remaining} of ${dailyCalories}`}</CustomText>
          {extraKCal !== 0 && (
            <CustomText
              size="sm"
              color={extraKCal > 0 ? 'successLight' : 'errorLight'}>
              {`(${extraKCal > 0 ? `+${extraKCal}` : extraKCal})`}
            </CustomText>
          )}
          <CustomText color="gray">{'kcal'}</CustomText>
        </Row>
        <CustomText font="wotfardMedium">{'remaining'}</CustomText>
      </Row>
    );
  } else {
    return (
      <InfoCard icon="check" iconColor="success">
        <Row className="flex-wrap items-center w-[85%]">
          <CustomText style={{flex: 1}} className="w-[100%] text-center">
            {'You are within your daily limit, keep this up 🥳'}
          </CustomText>
        </Row>
      </InfoCard>
    );
  }
};
