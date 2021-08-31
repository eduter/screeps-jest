"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathToString_1 = require("./pathToString");
describe('pathToString', () => {
    it('formats property paths, given a list of keys', () => {
        const actual = pathToString_1.pathToString(['array', 2, '_1$', 'some matrix', 0, 2, 5, 'foo']);
        const expected = "array[2]._1$['some matrix'][0][2][5].foo";
        expect(actual).toEqual(expected);
    });
});
