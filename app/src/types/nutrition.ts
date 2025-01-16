import {MealTypes, ProductTypes} from '../constants/types';

export interface Product {
  // Both
  productId?: string;
  type: ProductType;
  date?: Date;
  quantity: number;
  _id?: string;
  // From QR Code API
  imageUrl?: string;
  qrCode?: string;
  servingSize?: number;
  hasServingSize?: boolean;
  // From Foods API
  name: string;
  calories: number;
  nutrients: Nutrients;
}

export type ProductSearch = {
  query: string;
  products: Product[];
};

export type ProductUnique = {
  products: Product[];
  date: string;
};

export type ProductType = keyof typeof ProductTypes;

export type NutientKeys =
  | 'fat'
  | 'saturatedFat'
  | 'protein'
  | 'carbohydrates'
  | 'sugars'
  | 'sodium'
  | 'fiber'
  | 'calcium'
  | 'iron'
  | 'cholesterol'
  | 'potassium';

export type Nutrients = {[key in NutientKeys]: number};

type ProductDB = Pick<Product, 'productId' | 'type' | 'date' | 'quantity'>;

export interface Meal {
  _id?: string;
  date: Date;
  type: MealType;
  products: Product[];
}

export type DailyMealsType = {
  meals: {
    [type in MealType]?: DailyMealType | DailyQuickMealType;
  };
} & AggregatedNutrientTypes;

export const isDailyMealItem = (
  item: DailyMealType | DailyQuickMealType,
): item is DailyMealType => (item as DailyMealType).products.length > 0;

export const isDailyQuickMealItem = (
  item: DailyMealType | DailyQuickMealType,
): item is DailyQuickMealType => !!(item as DailyQuickMealType).quickMeal;

export type DailyQuickMealType = {
  calories: number;
  quantity: number;
  quickMeal: QuickMeal;
  nutrients_grams: Nutrients;
} & Pick<Meal, 'type' | '_id'>;

export type AggregatedNutrientTypes = {
  totalNutrientsGrams: Nutrients | null;
  totalCalories: number;
};

export interface QuickMeal extends Meal {
  imageUrl?: string;
  imageData?: number[];
  name: string;
}

export interface QuickMealInfo
  extends Omit<QuickMeal, 'imageData'>,
    AggregatedNutrientTypes {
  totalEntries: number;
  totalGrams: number;
}

export type DailyMealType = {
  calories: number;
  grams: number;
  nutrients_grams: Nutrients;
  nutrients_percentage: Nutrients;
  products: Product[];
} & Pick<Meal, 'type'>;

export type MealType = keyof typeof MealTypes;
