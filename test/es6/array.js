import {ArrayUtil} from '../../src/es6/array.js';

describe("ArrayUtil", ()=> {

  it("sum", ()=> {
    expect(ArrayUtil.sum([1, 2, 3])).toEqual(6);

    expect(()=>{ ArrayUtil.sum(null); }).toThrow();
  });

  it("average", ()=> {
    expect(ArrayUtil.average([1, 2, 3])).toEqual(2.0);

    expect(isNaN(ArrayUtil.average([]))).toBe(true);
    expect(()=>{ ArrayUtil.average(null); }).toThrow();
  });

  it("unique", ()=> {
    expect(ArrayUtil.unique([0, 0, 1, 0, 1])).toEqual([0, 1]);

    expect(()=>{ ArrayUtil.unique(null); }).toThrow();
  });

  it("range", ()=> {
    expect(ArrayUtil.range(0)).toEqual([]);
    expect(ArrayUtil.range(3)).toEqual([0, 1, 2]);
    expect(ArrayUtil.range(-3)).toEqual([0, -1, -2]);

    expect(ArrayUtil.range(1, 3)).toEqual([1, 2]);
    expect(ArrayUtil.range(3, 1)).toEqual([3, 2]);

    expect(ArrayUtil.range(1, 8, 2)).toEqual([1, 3, 5, 7]);
    expect(ArrayUtil.range(8, 1, 2)).toEqual([]);

    expect(ArrayUtil.range(7, 1, -2)).toEqual([7, 5, 3]);
    expect(ArrayUtil.range(1, 7, -2)).toEqual([]);
  });

});
