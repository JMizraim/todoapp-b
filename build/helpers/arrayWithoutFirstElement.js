"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayWithoutFirstElement = void 0;
const arrayWithoutFirstElement = (array) => {
    const newArray = [...array];
    newArray.shift();
    return newArray;
};
exports.arrayWithoutFirstElement = arrayWithoutFirstElement;
