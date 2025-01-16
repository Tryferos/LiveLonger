
interface Array<T> {
    limit: (limit: number) => Array<T>;
    unique: () => Array<T>;
    last: () => T | undefined;
    first: () => T | undefined;
}

Array.prototype.limit = function (limit: number) {
    return this.slice(0, limit);
};

Array.prototype.unique = function () {
    const unique: any[] = [];
    for (const item of this) {
        if (!unique.includes(item)) {
            unique.push(item);
        }
    }
    return unique;
};

Array.prototype.last = function () {
    if(this.length === 0) {
        return undefined;
    }else{
        return this[this.length - 1];
    }
};

Array.prototype.first = function () {
    if(this.length === 0) {
        return undefined;
    }else{
        return this[0];
    }
};