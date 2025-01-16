"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
exports.ROUTES = {
    USER: {
        INDEX: '/user',
        PRESETS: '/presets',
        PROGRAMS: '/programs',
        SELECTED_PROGRAM: '/selected-program',
    },
    MEALS: {
        INDEX: '/meals',
        MEALS_GET_DAILY: '/daily',
        DATES_AVAILABLE: '/dates-available',
        DELETE_MEAL_ITEM: '/delete-meal-item',
    },
    QUICK_MEALS: {
        INDEX: '/quick-meals',
        UNIQUE_PRODUCTS: '/unique-products',
        GET_MEALS: '/get',
        GET_MEAL: '/get-meal',
        SAVE_MEAL: '/save',
        DELETE_MEAL: '/delete',
        DELETE_PRODUCT: '/delete-product',
    },
    INFO: {
        INDEX: '/info',
        DELETE_ACCOUNT: '/delete-account',
        PRIVACY_POLICY: '/privacy-policy'
    },
    FOODS: {
        INDEX: '/foods',
        FOODS_SEARCH: '/search',
        FOODS_QR_CODE: '/:qr_code',
        FOODS_SAVE: '/save',
        FOODS_SAVE_QUICK_MEAL: '/save-quick-meal',
        FOODS_UNIQUE: '/unique',
    },
    INDEX: '/',
    PATH_INDEX: '/api',
};
