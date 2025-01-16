"use strict";
String.prototype.upperFirst = function () {
    const firstLetter = this.charAt(0);
    if (!firstLetter)
        return this.toString();
    return firstLetter.toUpperCase() + this.slice(1);
};
String.prototype.upperFirstMulti = function (props) {
    const seperator = props?.seperator ?? '_';
    return this.split(seperator)
        .map(word => word.upperFirst())
        .join(' ');
};
