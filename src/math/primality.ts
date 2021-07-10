/**
 * Generate Prime Number List in JavaScript
 */

import {BMath} from './bmath';
import {BitArray} from '../utils/bitarray';

/**
 * Primality
 * @class Primality
 */
export class Primality {
  /**
   * @return {Iterator}
   */
  public static generate(): IterableIterator<number> {
    return function *(): IterableIterator<number> {
      const list: number[] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      yield* list;

      const len: number = list.length;
      const init: number = list[len - 1] + 2;
      for (let i: number = init; ; i += 2) {
        let f = false;
        for (let j = 1, lj: number; (lj = list[j]) * lj <= i; ++j) {
          f = true;
          if (!(i % lj)) {
            f = false;
            break;
          }
        }
        if (f) {
          list.push(i);
          yield i;
        }
      }
    }();
  }

  /**
   * @param {number} n
   * @return {Iterator}
   */
  public static top(n: number): IterableIterator<number> {
    return function *(): IterableIterator<number> {
      if (n < 1) {
        throw new RangeError('argument[0] must > 0');
      }
      const g: IterableIterator<number> = Primality.generate();
      while (n--) {
        yield g.next().value;
      }
    }();
  }

  /**
   * @param {number} n
   * @return {Iterator}
   */
  public static max(n: number): IterableIterator<number> {
    return function *(): IterableIterator<number> {
      const g: IterableIterator<number> = Primality.generate();
      let f: number = g.next().value;
      while (f < n) {
        yield f;
        f = g.next().value;
      }
    }();
  }

  /**
   * @param {number} n
   * @return {Iterator}
   */
  public static sieveMax_(n: number): IterableIterator<number> {
    return function *(): IterableIterator<number> {
      if (n < 2) { return; }
      const s: boolean[] = [false, false];
      const sqrtn: number = Math.sqrt(n) | 0;
      for (let i = 2; i < n + 1; ++i) {
        s[i] = true;
      }
      for (let i = 2; i < sqrtn + 1; ++i) {
        if (s[i]) {
          for (let j: number = i * i; j < n + 1; j += i) {
            s[j] = false;
          }
        }
      }
      for (let i = 0; i < n + 1; ++i) {
        if (s[i]) {
          yield i;
        }
      }
    }();
  }

  /**
   * @param {number} n
   * @return {Iterator}
   */
  public static sieveMax(n: number): IterableIterator<number> {
    return function *(): IterableIterator<number> {
      if (n < 2) { return; }
      const s: BitArray = new BitArray(n);
      // s.set(0, false);
      // s.set(1, false);
      const sqrtn: number = Math.sqrt(n) | 0;
      for (let i = 2; i < n + 1; ++i) {
        s.set(i, true);
      }
      for (let i = 2; i < sqrtn + 1; ++i) {
        if (s.get(i)) {
          for (let j: number = i * i; j < n + 1; j += i) {
            s.set(j, false);
          }
        }
      }
      for (let i = 0; i < n + 1; ++i) {
        if (s.get(i)) {
          yield i;
        }
      }
    }();
  }

  public static factorization(n: number): number[] {
    const fs: number[] = [];
    // console.log(`factorization(${n})`);
    if (n < 1) {
      throw new RangeError('n < 1');
    }
    const sq = (Math.ceil(Math.sqrt(n)) | 0);
    // console.log(`sq = ${sq}`);
    let x = n;
    const ps = Primality.sieveMax(sq);
    for (const p of ps) {
      // console.log(`p = ${p}`);
      while (!(x % p)) {
        fs.push(p);
        x /= p;
      }
      if (x === 1) {
        break;
      }
    }
    return fs;
  }

  /**
   * trial division
   * @param {number} a 
   * @return {boolean}
   */
  public static isPrime(a: number): boolean {
    if (a < 2) {
      return false;
    }
    if (a === 2 || a === 3) {
      return true;
    }
    if (!(a & 1) || !(a % 3)) {
      return false;
    }
    const sq: number = (Math.sqrt(a) | 0);
    let i = 5;
    for (;;) {
      if (!(a % i)) {
        return false;
      }
      i += 2;
      if (i > sq) { break; }

      if (!(a % i)) {
        return false;
      }
      i += 4;
      if (i > sq) { break; }
    }

    return true;
  }

  /**
   * trial division
   * @param {bigint} a 
   * @return {boolean}
   */
  public static isBigPrime(a: bigint): boolean {
    if (a < 2n) {
      return false;
    }
    if (a == 2n || a == 3n) {
      return true;
    }
    if (!(a & 1n) || !(a % 3n)) {
      return false;
    }
    const sq: bigint = BMath.isqrt(a);
    let i = 5n;
    for (;;) {
      if (!(a % i)) {
        return false;
      }
      i += 2n;
      if (i > sq) { break; }

      if (!(a % i)) {
        return false;
      }
      i += 4n;
      if (i > sq) { break; }
    }

    return true;
  }

  /**
   * @param {number} base
   * @param {number} power
   * @param {number} mod
   * @return {number}
   */
  public static modMathPow(base: number, power: number, mod: number): number {
    let result = 1;
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
   * Miller-Rabin primality test
   * @param {number} n
   * @return {boolean} true if probably prime
   */
  public static mrpt(n: number): boolean {
    if (isNaN(n) || n < 2) {
      return false;
    }
    if (n === 2) {
      return true;
    }
    if (!(n & 1)) {
      return false;
    }

    let d: number = n - 1;
    while (!(d & 1)) {
      d >>= 1;
    }
    let i = 20;
    while (i--) {
      const a: number = (Math.random() * (n - 2) | 0) + 1;
      let t: number = d;
      let y: number = Primality.modMathPow(a, t, n);
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

  /**
   * @param {bigint} base
   * @param {bigint} power
   * @param {bigint} mod
   * @return {bigint}
   */
  public static bmodMathPow(base: bigint, power: bigint, mod: bigint): bigint {
    let result = 1n;
    while (power > 0n) {
      if (power & 1n) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      power >>= 1n;
    }
    return result;
  }

  /**
   * Miller-Rabin primality test
   * @param {bigint} n
   * @return {boolean} true if probably prime
   */
  public static bmrpt(n: bigint): boolean {
    if (n < 2n) {
      return false;
    }
    if (n == 2n) {
      return true;
    }
    if (!(n & 1n)) {
      return false;
    }

    let d: bigint = n - 1n;
    while (!(d & 1n)) {
      d >>= 1n;
    }
    let i = 20;
    const max: number = BigInt(Number.MAX_SAFE_INTEGER) > n - 2n ?
        Number(n - 2n) : Number.MAX_SAFE_INTEGER;
    while (i--) {
      const a: bigint = BigInt(Math.random() * max | 0) + 1n;
      let t: bigint = d;
      let y: bigint = Primality.bmodMathPow(a, t, n);
      while (t != n - 1n && y != 1n && y != n - 1n) {
        y = (y * y) % n;
        t <<= 1n;
      }
      if (y != n - 1n && !(t & 1n)) {
        return false;
      }
    }
    return true;
  }
}
