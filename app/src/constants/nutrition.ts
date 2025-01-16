import {Product} from '../types/nutrition';

export const NutrimentKeys: {
  [key: string]: keyof Pick<Product, 'nutrients'>['nutrients'];
} = Object.freeze({
  Protein: 'protein',
  Carbs: 'carbohydrates',
  Fat: 'fat',
});

export const NutrimentIcons: {
  [key: string]: string;
} = Object.freeze({
  Protein: '🍗',
  Carbs: '🥖',
  Fat: '🍩',
  'Saturated Fat': '🥜',
  Sodium: '🍚',
  Sugars: '🍬',
  Potassium: '🥔',
  Fiber: '🥦',
});

export const NutrimentSecondayKeys: {
  [key: string]: keyof Pick<Product, 'nutrients'>['nutrients'];
} = Object.freeze({
  'Saturated Fat': 'saturatedFat',
  Sodium: 'sodium',
  Sugars: 'sugars',
});

export const calculatePercentage = (value: number, _total: number) => {
  if (value == 0) {
    return '(0%)';
  }
  const total = _total;
  const percentage = (value / total) * 100;
  return `(${percentage.toFixed(percentage < 1 ? 1 : 0)}%)`;
};

export const calculateValueBasedOnTotal = (value: number, total: number) => {
  const offset = total / 100;
  return value * offset;
};

export const MORE_CALORIES_CONSUMED = -100;
