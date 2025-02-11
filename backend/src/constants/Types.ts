import {ProgramType} from '../database/schema/program';

export const _DOC_LIMIT = 11;

export const MealTypes = Object.freeze({
  BREAKFAST: 'BREAKFAST',
  BRUNCH: 'BRUNCH',
  LUNCH: 'LUNCH',
  SNACK: 'SNACK',
  DINNER: 'DINNER',
});

export const ProductTypes = Object.freeze({
  INDIVIDUAL_QUERIED: 'INDIVIDUAL_QUERIED',
  SYNTHETIC_SCANNED: 'SYNTHETIC_SCANNED',
});

export const ProgramValues: {
  [key in ProgramType]: {
    title: string;
    description: string;
    caloricPercentage: number;
    calories?: number;
    carbsPercentage: number;
    carbsKcal?: number;
    fatsPercentage: number;
    fatsKcal?: number;
    proteinPerKg: number;
    proteinGrams?: number;
    program: ProgramType;
  };
} = Object.freeze({
  Maintenance: {
    title: 'Maintenance',
    description:
      'A goal focused on maintaining current body weight by consuming roughly the same number of calories as you burn each day. Nutrient balance helps sustain energy and muscle mass.',
    caloricPercentage: 1,
    carbsPercentage: 0.4,
    fatsPercentage: 0.25,
    proteinPerKg: 1.2,
    program: 'Maintenance',
  },
  Cutting: {
    title: 'Fat Loss with Muscle Retention',
    description:
      'A goal focused on fat loss while preserving muscle mass. This involves a moderate calorie deficit with higher protein intake to protect muscle and controlled carbohydrate intake.',
    caloricPercentage: 0.9,
    carbsPercentage: 0.25,
    fatsPercentage: 0.2,
    proteinPerKg: 2,
    program: 'Cutting',
  },
  'Weight-Loss': {
    title: 'Weight Loss',
    description:
      'A goal focused on reducing body fat by creating a calorie deficit. It involves eating fewer calories than your body burns daily, focusing on nutrient-dense foods to maximize satiety.',
    caloricPercentage: 0.8,
    carbsPercentage: 0.3,
    fatsPercentage: 0.25,
    proteinPerKg: 1.2,
    program: 'Weight-Loss',
  },
  'Mass-Gain': {
    title: 'Bulking',
    description:
      'A goal for increasing muscle mass with a calorie surplus. The focus is on strength training and consuming extra calories, especially from carbohydrates and protein to fuel muscle growth.',
    caloricPercentage: 1.1,
    carbsPercentage: 0.5,
    fatsPercentage: 0.2,
    proteinPerKg: 1.6,
    program: 'Mass-Gain',
  },
});
