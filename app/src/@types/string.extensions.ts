interface String {
  upperFirst(): string;
  upperFirstMulti({seperator}?: {seperator?: '_' | ''}): string;
  ellipsis(maxWords: number, suffix?: string): string;
  toCamelCase(): string;
}

String.prototype.toCamelCase = function () {
  const words = this.split(' ');
  let str = '';
  words.forEach((word, index) => {
    if (index === 0) {
      str += word.toLowerCase();
    } else {
      str += word.at(0)?.toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  return str;
};

String.prototype.upperFirst = function () {
  const firstLetter = this.charAt(0);
  if (!firstLetter) return this.toString();
  return firstLetter.toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.upperFirstMulti = function (props) {
  const seperator = props?.seperator ?? '_';
  return this.split(seperator)
    .map(word => word.upperFirst())
    .join(' ');
};

String.prototype.ellipsis = function (maxWords, suffix) {
  if (this.length <= maxWords) return this.toString();
  const words = this.split(' ');
  const result = words.slice(0, maxWords).join(' ');
  return result + (suffix ?? '...');
};
