import { pathToString } from './pathToString';

describe('pathToString', () => {

  it('formats property paths, given a list of keys', () => {
    const actual = pathToString(['array', 2, '_1$', 'some matrix', 0, 2, 5, 'foo']);
    const expected = "array[2]._1$['some matrix'][0][2][5].foo";
    expect(actual).toEqual(expected);
  });

});
