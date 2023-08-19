/**
 * Generate Prime Number List in JavaScript
 */

import { isqrt } from './bmath';
import { BitArray } from '../utils/bitarray';

export function* primes(): IterableIterator<number> {
  const list: number[] = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ];
  yield* list;

  const len: number = list.length;
  const init: number = list[len - 1] + 2;
  for (let i: number = init; ; i += 2) {
    let f = false;
    for (let j = 1, lj: number; (lj = list[j]) * lj <= i; ++j) {
      f = true;
      if (i % lj === 0) {
        f = false;
        break;
      }
    }
    if (f) {
      list.push(i);
      yield i;
    }
  }
}

/**
 * Sieve of Eratosthenes
 * with array
 * @param n
 * @return
 */
export function* sieveE_(n: number): Generator<number> {
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
}

/**
 * Sieve of Eratosthenes
 * with BitArray
 * @param n
 * @return
 */
export function* sieveE(n: number): Generator<number> {
  if (n < 2) { return; }
  const s: BitArray = new BitArray(n);
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
}

/**
 * Sieve of Atkin
 * @param n
 * @return
 */
export function* sieveA(n: number): Generator<number> {
  if (n < 2) { return; }

  const s: BitArray = new BitArray(n);
  const upper: number = n + 1;
  const upperSqrt: number = (Math.sqrt(n) | 0) + 1;

  for (let z = 1; z < 6; z += 4) {
    for (let y = z; y < upperSqrt; y += 6) {
      for (let x = 1; x < upperSqrt; x++) {
        const n = 4 * x * x + y * y;
        if (n >= upper) {
          break;
        }
        s.toggle(n);
      }
      for (let x = y + 1; x < upperSqrt; x += 2) {
        const n = 3 * x * x - y * y;
        if (n >= upper) {
          break;
        }
        s.toggle(n);
      }
    }
  }
  for (let z = 2; z < 5; z += 2) {
    for (let y = z; y < upperSqrt; y += 6) {
      for (let x = 1; x < upperSqrt; x += 2) {
        const n = 3 * x * x + y * y;
        if (n >= upper) {
          break;
        }
        s.toggle(n);
      }
      for (let x = y + 1; x < upperSqrt; x += 2) {
        const n = 3 * x * x - y * y;
        if (n >= upper) {
          break;
        }
        s.toggle(n);
      }
    }
  }
  for (let y = 3; y < upperSqrt; y += 6) {
    for (let z = 1; z < 3; z++) {
      for (let x = z; x < upperSqrt; x += 3) {
        const n = 4 * x * x + y * y;
        if (n >= upper) {
          break;
        }
        s.toggle(n);
      }
    }
  }

  for (let i = 5; i < upperSqrt; ++i) {
    if (s.get(i)) {
      const x = i * i;
      for (let j = x; j < upper; j += x) {
        s.set(j, false);
      }
    }
  }

  s.set(2, true);
  s.set(3, true);
  for (let i = 0; i < upper; ++i) {
    if (s.get(i)) {
      yield i;
    }
  }
}

/**
 * 
 * @param n 
 * @returns 
 */
export function* factorization(n: number): Generator<number> {
  if (n < 1) {
    throw new RangeError('n < 1');
  }
  const sq = (Math.ceil(Math.sqrt(n)) | 0);
  // console.log(`sq = ${sq}`);
  let x = n;
  const ps = sieveA(sq);
  for (const p of ps) {
    // console.log(`p = ${p}`);
    while (!(x % p)) {
      yield p;
      x /= p;
    }
    if (x === 1) {
      break;
    }
  }
}

/**
 * trial division
 * @param a 
 * @return
 */
export function isPrime(a: number): boolean {
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
  for (; ;) {
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
 * @param a 
 * @return
 */
export function isBigPrime(a: bigint): boolean {
  if (a < 2n) {
    return false;
  }
  if (a == 2n || a == 3n) {
    return true;
  }
  if (!(a & 1n) || !(a % 3n)) {
    return false;
  }
  const sq: bigint = isqrt(a);
  let i = 5n;
  for (; ;) {
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
 * @param base
 * @param power
 * @param mod
 * @return
 */
export function modMathPow(base: number, power: number, mod: number): number {
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
 * @param n
 * @return true if probably prime
 */
export function mrpt(n: number): boolean {
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
    let y: number = modMathPow(a, t, n);
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
 * @param base
 * @param power
 * @param mod
 * @return
 */
export function bmodMathPow(base: bigint, power: bigint, mod: bigint): bigint {
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
 * @param n
 * @return true if probably prime
 */
export function bmrpt(n: bigint): boolean {
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
    let y: bigint = bmodMathPow(a, t, n);
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
