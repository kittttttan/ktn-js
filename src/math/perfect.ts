import type {Np, uint} from '../types.ts';
import {isBigPrime} from '../math/primality.ts';

export function divisors(n: Np): number[] {
  n = n | 0;
  if (n < 1) {
    throw new RangeError();
  }

  const as = [1];
  const sq = Math.sqrt(n) | 0;
  for (let i = 2; i < sq + 1; i++) {
    if (n % i === 0) {
      as.push(i);
      const ni = n / i;
      if (i !== ni) {
        as.push(n / i);
      }
    }
  }
  as.sort((a, b) => a - b);
  if (n > 1) {
    as.push(n);
  }

  return as;
}

export function isPerfect(n: uint): boolean {
  let s = 0;
  for (const d of divisors(n)) {
    s += d;
  }

  return s === 2 * n;
}

export function* perfects(): Generator<uint> {
  for (let i = 2; i < Number.MAX_SAFE_INTEGER; i++) {
    if (isPerfect(i)) {
      yield i;
    }
  }
}

export function* evenPerfects(): Generator<bigint> {
  for (let i = 1n; i < Number.MAX_SAFE_INTEGER; i++) {
    const mp = (2n ** i) - 1n;
    if (isBigPrime(mp)) {
      yield mp * 2n ** (i - 1n);
    }
  }
}