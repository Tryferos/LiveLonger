"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCalories = void 0;
const calculateCalories = (presets) => {
    const { sex, daily_calories } = presets;
    if (daily_calories) {
        return daily_calories;
    }
    else if (sex === 'male') {
        return Math.round(calculateMaleCalories(presets));
    }
    else {
        return Math.round(calculateFemaleCalories(presets));
    }
};
exports.calculateCalories = calculateCalories;
const calculateMaleCalories = ({ age, height, weight, activity_level, }) => {
    return ((66.47 + 13.75 * weight + 5.003 * height - 6.755 * age) *
        Math.min(2, Math.max(1, activity_level)) // [1 - 2]
    );
};
const calculateFemaleCalories = ({ age, height, weight, activity_level, }) => {
    return ((655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) *
        Math.min(2, Math.max(1, activity_level)) // [1 - 2]
    );
};
