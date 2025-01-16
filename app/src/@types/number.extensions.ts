interface Number {
  toPercentage(divideBy?: number): number;
  formatPercentage(props?: {noMax?: boolean} | undefined): string;
  between(min: number, max: number): number;
  limitDigits(digits?: number): number;
  absolute(): number;
}

Number.prototype.absolute = function () {
  return Math.abs(Number(this));
};

Number.prototype.formatPercentage = function (props) {
  const number = Number(this);
  return `${Math.round(
    (number * 100).between(0, props?.noMax === true ? Number.MAX_VALUE : 100),
  )}%`;
};

Number.prototype.toPercentage = function (divideBy?: number) {
  if (!divideBy || divideBy === 0) return 0;
  return (Number(this) / divideBy).limitDigits(1);
};

Number.prototype.between = function (min: number, max: number) {
  return Math.max(min, Math.min(Number(this), max));
};

Number.prototype.limitDigits = function (digits = 2) {
  return Number(this.toFixed(digits));
};
