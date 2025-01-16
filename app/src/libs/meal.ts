import {MealTypes} from '../constants/types';
import {MealType} from '../types/nutrition';

export const getMealType = (date?: Date): MealType => {
  const hours = date?.getHours() ?? new Date().getHours();
  if (hours < 6) {
    return MealTypes.DINNER;
  }
  if (hours < 12) {
    //[6-11]
    return MealTypes.BREAKFAST;
  }
  if (hours < 13) {
    //[12-13]
    return MealTypes.BRUNCH;
  }
  if (hours < 17) {
    //[13-16]
    return MealTypes.LUNCH;
  }
  if (hours < 20) {
    //[17-19]
    return MealTypes.SNACK;
  }
  return MealTypes.DINNER; //[21-5]
};

export const getMealName = (date?: Date): string => {
  const text = getMealType(date ?? new Date());
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getMealTypeIcon = (mealType: MealType) => {
  switch (mealType) {
    case MealTypes.BREAKFAST:
      return '🥐';
    case MealTypes.BRUNCH:
      return '🥞';
    case MealTypes.LUNCH:
      return '🍖';
    case MealTypes.SNACK:
      return '🥪';
    case MealTypes.DINNER:
      return '🍕';
  }
};
