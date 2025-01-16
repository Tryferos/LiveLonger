import {create} from 'zustand';
import {MealType} from '../types/nutrition';
import {getNutritionPresets, setNutritionPresets} from '../network/user';
import {UserPresets} from '../types/settings';
import {useAlerts} from './alerts';
import {wait} from '../libs/utils';

type NutritionPresetsState = {
  presets: UserPresets | null;
  setPresets: (
    presets: Partial<UserPresets>,
  ) => Promise<Required<UserPresets> | null>;
  init: () => Promise<UserPresets | null>;
};

const MealFactors = Object.freeze({
  breakfast_calories_factor: 0.25,
  brunch_calories_factor: 0.1,
  lunch_calories_factor: 0.35,
  dinner_calories_factor: 0.2,
  snack_calories_factor: 0.1,
});

export const useNutritionPresets = create<NutritionPresetsState>()(set => ({
  presets: null,
  setPresets: async (presets: Partial<UserPresets>) => {
    if (
      presets.age &&
      presets.height &&
      presets.weight &&
      presets.activity_level &&
      presets.sex
    ) {
      const res = await useAlerts.getState().showAlertPromise({
        promise: setNutritionPresets({
          age: presets.age,
          height: presets.height,
          weight: presets.weight,
          activity_level: presets.activity_level,
          sex: presets.sex,
        }),
        successData: res => {
          return {
            message: `Calculated ${res.daily_calories} kcal!`,
          };
        },
        errorData: {
          message: 'Something went wrong',
        },
        promiseData: {
          message: 'Calculating...',
        },
      });
      set({presets: res});
      return res;
    } else {
      return null;
    }
  },
  init: async () => {
    const presets = await getNutritionPresets();
    if (!presets) {
      set({presets: null});
      return null;
    } else {
      set({presets});
      return presets;
    }
  },
}));

export const getPreset = (type: MealType) => {
  switch (type) {
    case 'BREAKFAST':
      return {
        factor: MealFactors.breakfast_calories_factor,
      };
    case 'BRUNCH':
      return {
        factor: MealFactors.brunch_calories_factor,
      };
    case 'LUNCH':
      return {
        factor: MealFactors.lunch_calories_factor,
      };
    case 'DINNER':
      return {
        factor: MealFactors.dinner_calories_factor,
      };
    case 'SNACK':
      return {
        factor: MealFactors.snack_calories_factor,
      };
  }
};
