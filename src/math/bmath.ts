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
}
