import {Product} from '../types/nutrition';

export const queryIsValid = (query: string) => {
  return query && query.length >= 4;
};

export const getTotalCalories = (products: Product[]) => {
  return {
    totalCalories: products
      .reduce((acc, product) => acc + product.calories, 0)
      .toFixed(0),
    totalQuantity: products
      .reduce((acc, product) => acc + product.quantity, 0)
      .toFixed(0),
  };
};

export const formatProductWithGrams = (
  savedProduct: Product,
  quantity: number,
): Product => {
  const factor = quantity / savedProduct.quantity;
  const calories = Math.round(savedProduct.calories * factor);
  return {
    ...savedProduct,
    calories,
    nutrients: {
      calcium: Math.round(savedProduct.nutrients.calcium * factor),
      cholesterol: Math.round(savedProduct.nutrients.cholesterol * factor),
      fiber: Math.round(savedProduct.nutrients.fiber * factor),
      iron: Math.round(savedProduct.nutrients.iron * factor),
      potassium: Math.round(savedProduct.nutrients.potassium * factor),
      protein: Math.round(savedProduct.nutrients.protein * factor),
      sodium: Math.round(savedProduct.nutrients.sodium * factor),
      sugars: Math.round(savedProduct.nutrients.sugars * factor),
      carbohydrates: Math.round(savedProduct.nutrients.carbohydrates * factor),
      fat: Math.round(savedProduct.nutrients.fat * factor),
      saturatedFat: Math.round(savedProduct.nutrients.saturatedFat * factor),
    },
    quantity: quantity,
  };
};

export const getProductIconFromName = (_name: string) => {
  const name = _name.toLowerCase();
  switch (name) {
    case 'apple':
    case 'apples':
      return '🍎';
    case 'banana':
    case 'bananas':
      return '🍌';
    case 'orange':
    case 'oranges':
      return '🍊';
    case 'grapes':
    case 'grape':
      return '🍇';
    case 'strawberry':
    case 'strawberrys':
      return '🍓';
    case 'lemon':
    case 'lemons':
      return '🍋';
    case 'watermelon':
    case 'watermelons':
    case 'melon':
    case 'melons':
      return '🍉';
    case 'chicken':
    case 'chicken wings':
    case 'chickens':
    case 'chick':
    case 'chicks':
    case 'chicken breast':
    case 'chicken breasts':
      return '🍗';
    case 'rice':
      return '🍚';
    case 'milk':
    case 'almond milk':
    case 'oat milk':
    case 'goat milk':
      return '🥛';
    case 'bread':
    case 'breads':
      return '🍞';
    case 'berry':
    case 'berries':
    case 'blueberry':
    case 'blueberries':
      return '🫐';
    case 'strawberry':
    case 'strawberries':
    case 'strawberrys':
    case 'strawbery':
    case 'strawberies':
    case 'strawberys':
      return '🍓';
    case 'oat':
    case 'oats':
    case 'oat meal':
    case 'oatsmeal':
    case 'oatmeal':
    case 'oats meal':
    case 'oat-meal':
    case 'oats-meal':
      return '🌾';
    case 'potato':
      return '🥔';
    case 'tomato':
      return '🍅';
    case 'egg':
    case 'boiled egg':
    case 'boiled eggs':
    case 'eggs':
      return '🥚';
    case 'broccoli':
      return '🥦';
    case 'carrot':
      return '🥕';
    case 'onion':
      return '🧅';
    case 'lettuce':
      return '🧄';
    case 'cucumber':
      return '🥒';
    case 'pineapple':
      return '🍍';
    case 'steak':
      return '🥩';
    case 'bacon':
      return '🥓';
    case 'beans':
      return '🫘';
    case 'fries':
      return '🍟';
    case 'french-fries':
    case 'french fries':
    case 'fries':
    case 'chips':
      return '🍟';
    case 'cake':
    case 'cakes':
      return '🍰';
    case 'choco':
    case 'chocolate':
    case 'dark chocolate':
    case 'bitter chocolate':
    case 'dark-chocolate':
    case 'chocolates':
      return '🍫';
    case 'spaghetti':
    case 'pasta':
      return '🍝';
    case 'pizza':
      return '🍕';
    case 'salad':
      return '🥗';
    case 'salmon':
      return '🍣';
    case 'tuna':
      return '🐟';
    case 'shrimp':
      return '🦐';
    case 'fish':
      return '🐟';
    case 'chicken':
      return '🐓';
    case 'beef':
      return '🐄';
    case 'pork':
      return '🥓';
    case 'lamb':
      return '🍖';
    case 'duck':
      return '🦆';
    case 'goose':
      return '🦅';
    case 'turkey':
      return '🦃';
    case 'burger':
    case 'hamburger':
    case 'cheeseburger':
      return '🍔';
    case 'fried egg':
    case 'egg-fried':
    case 'egg fried':
    case 'fried eggs':
    case 'friedegg':
    case 'friedeggs':
      return '🍳';
    case 'bread' || 'breads':
      return '🍞';
    case 'cheese':
      return '🧀';
    case 'yogurt':
      return '🍦';
    case 'cocoa':
      return '🥛';
    case 'peanutbutter':
    case 'peanut butter':
    case 'peanut-butter':
    case 'peanut':
    case 'peanuts':
      return '🥜';
    case 'honey':
      return '🍯';
    case 'icecream':
    case 'ice-cream':
      return '🍦';
    case 'popcorn':
    case 'pop-corn':
    case 'pop corn':
      return '🍿';
    case 'corn':
    case 'corns':
      return '🌽';
    case 'mushroom':
    case 'mushrooms':
      return '🍄';
    case 'brown mushroom':
    case 'brown mushrooms':
    case 'brown-mushroom':
    case 'brown-mushrooms':
      return '🍄‍🟫';
    case 'sandwich':
    case 'sandwiches':
      return '🥪';
    case 'butter':
    case 'buter':
    case 'butters':
      return '🧈';
    case 'salt':
    case 'pepper':
    case 'cinnamon':
      return '🧂';
    case 'soda':
    case 'sodas':
    case 'tea':
    case 'drink':
      return '🧋';
    case '':
      return '';
  }
  return undefined;
};

export const recalculateProcuctNutrition = (
  product: Product,
  newQuantity: number,
) => {
  const {calories, quantity, nutrients} = {...product};
  const change = newQuantity === 0 ? 0 : newQuantity / quantity;
  product.quantity = newQuantity;
  product.calories = calories * change;
  product.nutrients.fat = nutrients.fat * change;
  product.nutrients.saturatedFat = nutrients.saturatedFat * change;
  product.nutrients.protein = nutrients.protein * change;
  product.nutrients.carbohydrates = nutrients.carbohydrates * change;
  product.nutrients.sugars = nutrients.sugars * change;
  product.nutrients.sodium = nutrients.sodium * change;
  product.nutrients.fiber = nutrients.fiber * change;
  product.nutrients.calcium = nutrients.calcium * change;
  product.nutrients.iron = nutrients.iron * change;
  product.nutrients.cholesterol = nutrients.cholesterol * change;
  product.nutrients.potassium = nutrients.potassium * change;
};
