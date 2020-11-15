'use strict';

export class BMath {
  public static abs(a: bigint): bigint {
    return a < 0n ? -a : a;
  }

  public static gcd(a: bigint, b: bigint): bigint {
    if (a <= 0n) {
      throw new RangeError('a <= 0');
    }
    if (b <= 0n) {
      throw new RangeError('b <= 0');
    }

    function impl(a: bigint, b: bigint): bigint {
      if (b == 0n) { return a; }
      return impl(b, a % b);
    }

    return a < b ? impl(b, a) : impl(a, b);
  }

  public static isqrt(a: bigint): bigint {
    if (a < 0n) {
      throw new RangeError('a < 0');
    }
    if (a < 2n) {
      return a;
    }
    let shift = 2n;
    while ((a >> shift) != 0n) {
      shift += 2n;
    }

    let result = 0n;
    while (shift >= 0n) {
      result <<= 1n;
      const large_cand = result + 1n;
      if (large_cand * large_cand <= (a >> shift)) {
        result = large_cand;
      }
      shift -= 2n;
    }

    return result;
  }

  public static rootNth(value: bigint, k = 2n): bigint {
    if (value < 0n) {
      throw RangeError('value < 0');
    }

    let o = 0n;
    let x = value;
    let limit = 1000;

    while (x ** k != k && x != o) {
      o = x;
      x = ((k - 1n) * x + value / x ** (k - 1n)) / k;
      --limit;
      if (!limit) {
        throw new Error('loop limit');
      }
    }

    return x;
  }

  public static log(a: bigint): number {
    if (a < 0n) {
      throw new RangeError('a < 0');
    }
    const s = a.toString();
    const order = s.length;
    return order * Math.log(10) + Math.log(parseFloat('0.' + s));
  }

  public static log2(a: bigint): number {
    if (a < 0n) {
      throw new RangeError('a < 0');
    }
    const s = a.toString();
    const order = s.length;
    return order * Math.log2(10) + Math.log2(parseFloat('0.' + s));
  }
}
