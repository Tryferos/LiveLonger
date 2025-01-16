interface Array<T> {
  limit: (limit: number) => Array<T>;
  unique: () => Array<T>;
  last: () => T | undefined;
  first: () => T | undefined;
  ascending: (key?: keyof T) => Array<T>;
  descending: (key?: keyof T) => Array<T>;
}

Array.prototype.ascending = function <T>(key?: keyof T) {
  const arr: T[] = this;
  if (key) {
    return arr.sort((a, b) => {
      const aVal = a?.[key] ?? 0;
      const bVal = b?.[key] ?? 0;
      if (typeof aVal !== 'number' || typeof bVal !== 'number') {
        if (typeof aVal === 'object' && typeof bVal === 'object') {
          return (
            ((aVal as unknown as Date | null)?.getTime() ?? 0) -
            ((bVal as unknown as Date | null)?.getTime() ?? 0)
          );
        }
        return 0;
      } else {
        return (aVal ?? 0) - (bVal ?? 0);
      }
    });
  } else {
    return arr.sort((a, b) => {
      const aVal = a ?? 0;
      const bVal = b ?? 0;
      if (typeof aVal !== 'number' || typeof bVal !== 'number') {
        if (typeof aVal === 'object' && typeof bVal === 'object') {
          return (
            ((aVal as unknown as Date | null)?.getTime() ?? 0) -
            ((bVal as unknown as Date | null)?.getTime() ?? 0)
          );
        }
        return 0;
      } else {
        return aVal - bVal;
      }
    });
  }
};

Array.prototype.descending = function <T>(key?: keyof T) {
  const arr: T[] = this;
  if (key) {
    return arr.sort((a, b) => {
      const aVal = a?.[key] ?? 0;
      const bVal = b?.[key] ?? 0;
      if (typeof aVal !== 'number' || typeof bVal !== 'number') {
        return 0;
      } else {
        return bVal - aVal;
      }
    });
  } else {
    return arr.sort((a, b) => {
      const aVal = a ?? 0;
      const bVal = b ?? 0;
      if (typeof aVal !== 'number' || typeof bVal !== 'number') {
        return 0;
      } else {
        return bVal - aVal;
      }
    });
  }
};

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
  if (!this || this.length <= 0) {
    return undefined;
  } else {
    return this[this.length - 1];
  }
};

Array.prototype.first = function () {
  if (!this || this.length <= 0) {
    return undefined;
  } else {
    return this[0];
  }
};
