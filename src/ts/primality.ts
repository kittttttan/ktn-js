/// <reference path="typings/ktn.d.ts"/>
/**
 * Generate Prime Number List in JavaScript
 */
'use strict';

/**
 * Primality
 * @class Primality
 */
export default class Primality {
  /**
   * @return {!Iterator}
   */
  public static generate(): IterableIterator<int> {
    return function *(): IterableIterator<int> {
      const list: int[] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      for (const n of list) {
        yield n;
      }

      let len: int = list.length;
      const init: int = list[len - 1] + 2;
      for (let i: int = init; ; i += 2) {
        let f: boolean;
        for (let j: int = 1, lj: int; (lj = list[j]) * lj <= i; ++j) {
          f = true;
          if (!(i % lj)) {
            f = false;
            break;
          }
        }
        if (f) {
          list[len++] = i;
          yield i;
        }
      }
    }();
  }

  /**
   * @param {!int} n
   * @return {!Iterator}
   */
  public static top(n: int): IterableIterator<int> {
    return function *(): IterableIterator<int> {
      if (n < 1) {
        throw new Error('argument[0] must > 0');
      }
      const g: IterableIterator<int> = Primality.generate();
      while (n--) {
        yield g.next().value;
      }
    }();
  }

  /**
   * @param {!int} n
   * @return {!Iterator}
   */
  public static max(n: int): IterableIterator<int> {
    return function *(): IterableIterator<int> {
      const g: IterableIterator<int> = Primality.generate();
      let f: int = g.next().value;
      while (f < n) {
        yield f;
        f = g.next().value;
      }
    }();
  }

  /**
   * @param {!int} n
   * @return {!Iterator}
   */
  public static sieveMax(n: int): IterableIterator<int> {
    return function *(): IterableIterator<int> {
      const s: boolean[] = [false, false];
      const sqrtn: int = Math.sqrt(n) | 0;
      for (let i: int = 2; i < n + 1; ++i) {
        s[i] = true;
      }
      for (let i: int = 2; i < sqrtn + 1; ++i) {
        if (s[i]) {
          for (let j: int = i * i; j < n + 1; j += i) {
            s[j] = false;
          }
        }
      }
      for (let i: int = 0; i < n + 1; ++i) {
        if (s[i]) {
          yield i;
        }
      }
    }();
  }

  /**
   * @param {!int} base
   * @param {!int} power
   * @param {!int} mod
   * @return {!int}
   */
  public static modMathPow(base: int, power: int, mod: int): int {
    let result: int = 1;
    while (power > 0) {
      if (power & 1) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      power >>= 1;
    }
    return result;
  }

  /**
   * Miller–Rabin primality test
   * @param {!int} n
   * @return {!boolean} true if probably prime
   */
  public static mrpt(n: int): boolean {
    if (isNaN(n) || n < 2) {
      return false;
    }
    if (n === 2) {
      return true;
    }
    if (!(n & 1)) {
      return false;
    }

    const random: () => double = Math.random;

    let d: int = n - 1;
    while (!(d & 1)) {
      d >>= 1;
    }
    let i: int = 20;
    while (i--) {
      const a: int = (random() * (n - 2) | 0) + 1;
      let t: int = d;
      let y: int = Primality.modMathPow(a, t, n);
      while (t !== n - 1 && y !== 1 && y !== n - 1) {
        y = (y * y) % n;
        t <<= 1;
      }
      if (y !== n - 1 && !(t & 1)) {
        return false;
      }
    }
    return true;
  }
}
