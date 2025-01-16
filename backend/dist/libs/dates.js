"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayLimits = exports.getDayEndDate = exports.getDateDayStart = exports.getDayStartDate = void 0;
const getDayStartDate = (date) => {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate.getTime();
};
exports.getDayStartDate = getDayStartDate;
const getDateDayStart = (date) => {
    date.setUTCHours(0, 0, 0, 0);
    return date;
};
exports.getDateDayStart = getDateDayStart;
const getDayEndDate = (date) => {
    const newDate = new Date(date);
    newDate.setUTCHours(23, 59, 59, 999);
    return newDate.getTime();
};
exports.getDayEndDate = getDayEndDate;
const getDayLimits = (date) => {
    const start = (0, exports.getDayStartDate)(date);
    const end = (0, exports.getDayEndDate)(date);
    return { start, end };
};
exports.getDayLimits = getDayLimits;
