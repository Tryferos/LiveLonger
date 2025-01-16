import {useNutritionPresets} from '../store/nutrition_presets';
import {
  getSelectedProgram,
  useSelectedProgram,
} from '../store/selected_program';

export const useCalories = () => {
  const {presets} = useNutritionPresets();
  const {extraCalories} = getSelectedProgram();
  const getRemainingCalories = ({
    caloriesConsumed,
  }: {
    caloriesConsumed: number;
  }) => {
    return (presets?.daily_calories ?? 1) + extraCalories - caloriesConsumed;
  };
  return {getRemainingCalories};
};
