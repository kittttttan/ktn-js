/**
 * Generate Prime Number List in JavaScript
 */
import type {uint, Np} from '../types';
import { isqrt } from './bmath';
import { BitArray } from '../utils/bitarray';

export function* primes(): Generator<uint> {
  yield 2;
  yield 3;

  for (let i = 5; ;) {
    // 6n-1
    if (isPrime(i)) {
      yield i;
    }
    i += 2;

    // 6n+1
    if (isPrime(i)) {
      yield i;
    }
    // 6n+3 is not prime
    i += 4;
  }
}

/**
 * Sieve of Eratosthenes
 * with array
 * @param n
 * @return
 */
export function* sieveE_(n: uint): Generator<uint> {
  if (n < 2) { return; }
  const s = [false, false];
  const sqrtn = Math.sqrt(n) | 0;
  for (let i = 2; i < n + 1; ++i) {
    s[i] = true;
  }
  for (let i = 2; i < sqrtn + 1; ++i) {
    if (s[i]) {
      for (let j = i * i; j < n + 1; j += i) {
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
export function* sieveE(n: uint): Generator<uint> {
  if (n < 2) { return; }
  const s = new BitArray(n);
  const sqrtn = Math.sqrt(n) | 0;
  for (let i = 2; i < n + 1; ++i) {
    s.set(i, true);
  }
  for (let i = 2; i < sqrtn + 1; ++i) {
    if (s.get(i)) {
      for (let j = i * i; j < n + 1; j += i) {
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
export function* sieveA(n: uint): Generator<uint> {
  if (n < 2) { return; }

  const s = new BitArray(n);
  const upper = n + 1;
  const upperSqrt = (Math.sqrt(n) | 0) + 1;

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
export function* factorization(n: Np): Generator<Np> {
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
export function isPrime(a: uint): boolean {
  if (a < 2) {
    return false;
  }
  if (a === 2 || a === 3) {
    return true;
  }
  if (!(a & 1) || !(a % 3)) {
    return false;
  }

  const sq = (Math.sqrt(a) | 0);
  let i = 5;
  if (i > sq) { return true; }

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
  const sq = isqrt(a);
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
export function modMathPow(base: uint, power: uint, mod: uint): uint {
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
export function mrpt(n: uint): boolean {
  if (isNaN(n) || n < 2) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  if (!(n & 1)) {
    return false;
  }

  let d = n - 1;
  while (!(d & 1)) {
    d >>= 1;
  }
  let i = 20;
  while (i--) {
    const a = (Math.random() * (n - 2) | 0) + 1;
    let t = d;
    let y = modMathPow(a, t, n);
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

  let d = n - 1n;
  while (!(d & 1n)) {
    d >>= 1n;
  }
  let i = 20;
  const max = BigInt(Number.MAX_SAFE_INTEGER) > n - 2n ?
    Number(n - 2n) : Number.MAX_SAFE_INTEGER;
  while (i--) {
    const a = BigInt(Math.random() * max | 0) + 1n;
    let t = d;
    let y = bmodMathPow(a, t, n);
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
