import {isEmulator} from 'react-native-device-info';

export const EXTERNAL_API_URL =
  'https://world.openfoodfacts.org/api/v2/product/';

export const INTERNAL_API_URL = async () => {
  if (await isEmulator()) {
    return 'http://10.0.2.2:3000/api';
  }
  return 'https://livelonger.onrender.com/api';
};

export const API_ROUTES = {
  MEALS: {
    INDEX: '/meals',
    MEALS_GET_DAILY: '/meals/daily',
    DATES_AVAILABLE: '/meals/dates-available',
    DELETE_MEAL_ITEM: '/meals/delete-meal-item',
  },
  FOODS: {
    INDEX: '/foods',
    FOODS_SEARCH: '/foods/search',
    FOODS_QR_CODE: '/foods/<QR_CODE>',
    FOODS_SAVE: '/foods/save',
    FOODS_SAVE_QUICK_MEAL: '/foods/save-quick-meal',
    PRODUCTS_UNIQUE: '/foods/unique',
  },
  USER: {
    PRESETS: '/user/presets',
    PROGRAMS: '/user/programs',
    SELECTED_PROGRAM: '/user/selected-program',
  },
  QUICK_MEALS: {
    GET: '/quick-meals/get',
    GET_MEAL: '/quick-meals/get-meal',
    SAVE: '/quick-meals/save',
    DELETE: '/quick-meals/delete',
    UNIQUE_PRODUCTS: '/quick-meals/unique-products',
  },
};
