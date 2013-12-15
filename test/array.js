var ArrayUtil = require('../js/array.js').ArrayUtil;

describe("ArrayUtil", function() {

  it("some", function() {
    var filter = function(a) {
      return (a & 1) === 0;
    };

    expect(ArrayUtil.some([1, 2, 3], filter)).toBe(true);
    expect(ArrayUtil.some([1, 3, 5], filter)).toBe(false);

    expect(ArrayUtil.some([], filter)).toBe(false);
    expect(function(){ ArrayUtil.some(null, filter); }).toThrow();
  });

  it("every", function() {
    var filter = function(a) {
      return (a & 1) === 0;
    };

    expect(ArrayUtil.every([0, 2, 4], filter)).toBe(true);
    expect(ArrayUtil.every([1, 2, 3], filter)).toBe(false);

    expect(ArrayUtil.every([], filter)).toBe(true);
    expect(function(){ ArrayUtil.every(null, filter); }).toThrow();
  });

  it("filter", function() {
    var filter = function(a) {
      return (a & 1) === 0;
    };

    expect(ArrayUtil.filter([1, 2, 3, 4], filter)).toEqual([2, 4]);

    expect(function(){ ArrayUtil.filter(null, filter); }).toThrow();
  });

  it("forEach", function() {
    var sum = 0;
    var add = function(a) {
      return sum += a;
    };
    var dest = ArrayUtil.forEach([1, 2, 3], add);

    expect(sum).toEqual(6);

    expect(function(){ ArrayUtil.forEach(null, x2); }).toThrow();
  });

  it("map", function() {
    var x2 = function(a) {
      return 2 * a;
    };

    expect(ArrayUtil.map([1, 2, 3], x2)).toEqual([2, 4, 6]);

    expect(function(){ ArrayUtil.map(null, x2); }).toThrow();
    expect(ArrayUtil.map([], x2)).toEqual([]);
  });

  it("reduce", function() {
    var sub = function(a, b) {
      return a - b;
    };

    // 1 - 2 - 3
    expect(ArrayUtil.reduce([1, 2, 3], sub)).toEqual(-4);

    expect(function(){ ArrayUtil.reduce(null, sub); }).toThrow();
  });

  it("reduceRight", function() {
    var sub = function(a, b) {
      return a - b;
    };

    // 3 - 2 - 1
    expect(ArrayUtil.reduceRight([1, 2, 3], sub)).toEqual(0);

    expect(function(){ ArrayUtil.reduceRight(null, sub); }).toThrow();
  });

  it("sum", function() {
    expect(ArrayUtil.sum([1, 2, 3])).toEqual(6);

    expect(function(){ ArrayUtil.sum(null); }).toThrow();
  });

  it("average", function() {
    expect(ArrayUtil.average([1, 2, 3])).toEqual(2.0);

    expect(isNaN(ArrayUtil.average([]))).toBe(true);
    expect(function(){ ArrayUtil.average(null); }).toThrow();
  });

  it("unique", function() {
    expect(ArrayUtil.unique([0, 0, 1, 0, 1])).toEqual([0, 1]);

    expect(function(){ ArrayUtil.unique(null); }).toThrow();
  });

  it("range", function() {
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
