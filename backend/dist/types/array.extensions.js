"use strict";
Array.prototype.limit = function (limit) {
    return this.slice(0, limit);
};
Array.prototype.unique = function () {
    const unique = [];
    for (const item of this) {
        if (!unique.includes(item)) {
            unique.push(item);
        }
    }
    return unique;
};
Array.prototype.last = function () {
    if (this.length === 0) {
        return undefined;
    }
    else {
        return this[this.length - 1];
    }
};
Array.prototype.first = function () {
    if (this.length === 0) {
        return undefined;
    }
    else {
        return this[0];
    }
};
