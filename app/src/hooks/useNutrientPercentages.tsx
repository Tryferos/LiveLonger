import {useMemo} from 'react';
import {useNutritionPresets} from '../store/nutrition_presets';
import {getSelectedProgram} from '../store/selected_program';

type Props = {
  protein: number;
  carbs: number;
  fat: number;
};

export const useNutrientPercentages = ({
  protein,
  carbs,
  fat,
}: Partial<Props>): Props => {
  const {selectedProgram} = getSelectedProgram();
  const {presets} = useNutritionPresets();
  return useMemo(() => {
    if (
      !selectedProgram ||
      !presets ||
      protein === null ||
      protein === undefined ||
      carbs === null ||
      carbs === undefined ||
      fat === null ||
      fat === undefined
    ) {
      return {
        protein: 0,
        carbs: 0,
        fat: 0,
      };
    }
    return {
      protein: protein.toPercentage(selectedProgram.proteinGrams),
      carbs: (carbs * 8).toPercentage(selectedProgram.carbsKcal),
      fat: (fat * 8).toPercentage(selectedProgram.fatsKcal),
    };
  }, [presets, selectedProgram, protein, carbs, fat]);
};
