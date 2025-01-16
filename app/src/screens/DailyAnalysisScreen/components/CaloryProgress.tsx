import {FC} from 'react';
import {Row} from '../../../components/elements/Row';
import {Column} from '../../../components/elements/Column';
import {ProgressBar} from '../../../components/elements/ProgressBar';
import {AddButton} from './AddButton';
import {CustomText} from '../../../components/elements/CustomText';
import {useNutritionPresets} from '../../../store/nutrition_presets';
import {useAppRouteParams} from '../../../types/navigation';
import {getSelectedProgram} from '../../../store/selected_program';
import {useCalories} from '../../../hooks/useCalories';
import {MORE_CALORIES_CONSUMED} from '../../../constants/nutrition';
import {InfoCard} from '../../../components/organisms/InfoCard';

type CaloryProgressProps = {
  caloriesConsumed: number;
};

export const CaloryProgress: FC<CaloryProgressProps> = ({caloriesConsumed}) => {
  const {presets} = useNutritionPresets();
  const {fromAddType} = useAppRouteParams<'Daily_Analysis_Screen'>();
  const {getRemainingCalories} = useCalories();
  const {daily_calories = 1} = presets ?? {};
  const selectedProgram = getSelectedProgram();
  const progress = caloriesConsumed / daily_calories;
  const extraCalories = selectedProgram.extraCalories;
  const remaining = getRemainingCalories({caloriesConsumed: caloriesConsumed});
  return (
    <Row gap="2xs" className="items-center justify-between">
      <Column style={{flex: remaining > 0 ? 0 : 1}} gap="3xs">
        {remaining < MORE_CALORIES_CONSUMED ? (
          <InfoCard icon="info" iconColor="warning">
            <Row className="flex w-[90%] justify-start">
              <CustomText size="sm">{`You are`}</CustomText>
              <CustomText
                size="sm"
                color="warning"
                font="wotfardMedium">{` ${remaining.absolute()} kcal `}</CustomText>
              <CustomText size="sm">{`over your limit`}</CustomText>
            </Row>
          </InfoCard>
        ) : remaining > 0 ? (
          <>
            <Row className="justify-between">
              <CustomText font="wotfardMedium" color="gray400" size="sm">
                {'Remaining'}
              </CustomText>
              <Row gap="3xs" className="items-end">
                <CustomText font="wotfardMedium" size="lg">
                  {remaining}
                </CustomText>
                {extraCalories !== 0 && (
                  <CustomText
                    color={extraCalories > 0 ? 'successLight' : 'errorLight'}
                    font="wotfardMedium"
                    size="sm">
                    {`(${extraCalories > 0 ? '+' : ''}${extraCalories})`}
                  </CustomText>
                )}
                <CustomText font="wotfardMedium" color="gray400" size="sm">
                  {'kcal'}
                </CustomText>
              </Row>
            </Row>
            <ProgressBar progress={progress} widthFactor={0.75} />
          </>
        ) : (
          <InfoCard icon="check" iconColor="success">
            <Row className="flex-wrap items-center w-[85%]">
              <CustomText
                style={{flex: 1}}
                size="sm"
                className="w-[100%] text-center">
                {'You are within your daily limit, keep this up 🥳'}
              </CustomText>
            </Row>
          </InfoCard>
        )}
      </Column>
      <AddButton fromAddType={fromAddType} />
    </Row>
  );
};
