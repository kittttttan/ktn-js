import {ArrayUtil} from '../es6/array.js';

describe("ArrayUtil", ()=> {

  it("some", ()=> {
    const filter = (a)=> {
      return (a & 1) === 0;
    };

    expect(ArrayUtil.some([1, 2, 3], filter)).toBe(true);
    expect(ArrayUtil.some([1, 3, 5], filter)).toBe(false);

    expect(ArrayUtil.some([], filter)).toBe(false);
    expect(()=>{ ArrayUtil.some(null, filter); }).toThrow();
  });

  it("every", ()=> {
    const filter = (a)=> {
      return (a & 1) === 0;
    };

    expect(ArrayUtil.every([0, 2, 4], filter)).toBe(true);
    expect(ArrayUtil.every([1, 2, 3], filter)).toBe(false);

    expect(ArrayUtil.every([], filter)).toBe(true);
    expect(()=>{ ArrayUtil.every(null, filter); }).toThrow();
  });

  it("filter", ()=> {
    const filter = (a)=> {
      return (a & 1) === 0;
    };

    expect(ArrayUtil.filter([1, 2, 3, 4], filter)).toEqual([2, 4]);

    expect(()=>{ ArrayUtil.filter(null, filter); }).toThrow();
  });

  it("forEach", ()=> {
    let sum = 0;
    const add = (a)=> {
      return sum += a;
    };
    const dest = ArrayUtil.forEach([1, 2, 3], add);

    expect(sum).toEqual(6);

    expect(()=>{ ArrayUtil.forEach(null, x2); }).toThrow();
  });

  it("map", ()=> {
    const x2 = (a)=> {
      return 2 * a;
    };

    expect(ArrayUtil.map([1, 2, 3], x2)).toEqual([2, 4, 6]);

    expect(()=>{ ArrayUtil.map(null, x2); }).toThrow();
    expect(ArrayUtil.map([], x2)).toEqual([]);
  });

  it("reduce", ()=> {
    const sub = (a, b)=> {
      return a - b;
    };

    // 1 - 2 - 3
    expect(ArrayUtil.reduce([1, 2, 3], sub)).toEqual(-4);

    expect(()=>{ ArrayUtil.reduce(null, sub); }).toThrow();
  });

  it("reduceRight", ()=> {
    const sub = (a, b)=> {
      return a - b;
    };

    // 3 - 2 - 1
    expect(ArrayUtil.reduceRight([1, 2, 3], sub)).toEqual(0);

    expect(()=>{ ArrayUtil.reduceRight(null, sub); }).toThrow();
  });

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
