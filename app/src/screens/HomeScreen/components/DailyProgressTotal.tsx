import {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {DailyMealsType} from '../../../types/nutrition';
import {CustomText} from '../../../components/elements/CustomText';
import {ProgressBarCircle} from '../../../components/elements/ProgressBarCircle';
import {useNutritionPresets} from '../../../store/nutrition_presets';
import {CaloriesHeader} from './CaloriesHeader';
import {TotalNutrientsGrams} from './TotalNutrientsGrams';
import {DailyProgressTotalShimmer} from '../shimmers/DailyProgressTotalShimmer';
import {getSelectedProgram} from '../../../store/selected_program';

type DailyProgressProps = {
  dailyMeals: DailyMealsType | null;
};

export const DailyProgressTotal: FC<DailyProgressProps> = ({dailyMeals}) => {
  const {presets} = useNutritionPresets();
  const {daily_calories = 1} = presets ?? {daily_calories: 1};
  const {extraCalories} = getSelectedProgram();
  const progress =
    (dailyMeals?.totalCalories ?? 0) / (daily_calories + extraCalories);
  const progressText = progress.formatPercentage({noMax: true});
  if (!dailyMeals) {
    return <DailyProgressTotalShimmer />;
  } else {
    return (
      <Column gap="md" className="items-center relative">
        <Column className="relative">
          <ProgressBarCircle progress={progress} size={190} thickness={8} />
          <Column
            className="w-[55%] h-full absolute left-0 top-0 justify-center items-center"
            gap="3xs">
            <CustomText size="lg" font="wotfardMedium">
              {progressText}
            </CustomText>
            <CustomText size="sm" color="gray" font="wotfardMedium">
              {`${dailyMeals.totalCalories} kcal`}
            </CustomText>
          </Column>
        </Column>
        <CaloriesHeader totalCalories={dailyMeals.totalCalories} />
        <TotalNutrientsGrams
          totalNutrientsGrams={dailyMeals.totalNutrientsGrams}
        />
      </Column>
    );
  }
};
