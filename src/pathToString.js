"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToString = void 0;
/**
 * Returns a string representation of the path for a property.
 */
function pathToString(path) {
    return path
        .map((k, index) => {
        const key = k.toString();
        if (!isNaN(Number(key))) {
            return `[${key}]`;
        }
        else if (!validIdentifier.test(key)) {
            return `['${key}']`;
        }
        else if (index === 0) {
            return key;
        }
        else {
            return '.' + key;
        }
    })
        .join('');
}
exports.pathToString = pathToString;
const validIdentifier = /^[$A-Z_][0-9A-Z_$]*$/i;
