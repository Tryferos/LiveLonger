

const FOODS_API_BASE  = `https://api.calorieninjas.com/v1`;

const QR_CODE_API_BASE = 'https://world.openfoodfacts.org/api/v2'


export const foodsApi = Object.freeze({
    SEARCH_FOOD: `${FOODS_API_BASE}/nutrition`,
    SEARCH_QR_CODE: `${QR_CODE_API_BASE}/product`,
})