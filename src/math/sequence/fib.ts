/**
 * Fibonacci number
 *
 * F0 = 0
 * F1 = 1
 * Fn+2 = Fn + Fn-1 (n >= 0)
 */
import type {uint} from '../../types.ts';

/**
 * generate Fibonacci numbers
 */
export function* fibonacci(): Generator<uint> {
  yield 0;

  let [a, b] = [1, 0];
  while (true) {
    yield a;
    [a, b] = [a + b, a];
  }
}

export function* bigFibonacci(): Generator<bigint> {
  yield 0n;

  let [a, b] = [1n, 0n];
  while (true) {
    yield a;
    [a, b] = [a + b, a];
  }
}

/**
 * |a b|   |d e|   |ad+be bd+ce|
 * |   | x |   | = |           |
 * |b c|   |e f|   |bd+ce be+cf|
 */
function mmul(a: uint[], b: uint[]): uint[] {
  const ad = a[0] * b[0];
  const be = a[1] * b[1];
  const bd = a[1] * b[0];
  const ce = a[2] * b[1];
  const cf = a[2] * b[2];
  return [ad + be, bd + ce, be + cf];
}

/**
 * nth Fibonacci number
 *
 * |1 1|^n   |Fn+1 Fn  |
 * |   |   = |         |
 * |1 0|     |Fn   Fn-1|
 */
export function fib(n: uint): uint {
  if (n < 1) {
    return 0;
  }
  let a = [1, 1, 0];
  let b = [1, 1, 0];
  --n;
  while (n > 0) {
    if (n & 1) {
      b = mmul(b, a);
    }
    n >>= 1;
    a = mmul(a, a);
  }
  return b[1];
}

function bmmul(a: bigint[], b: bigint[]): bigint[] {
  const ad = a[0] * b[0];
  const be = a[1] * b[1];
  const bd = a[1] * b[0];
  const ce = a[2] * b[1];
  const cf = a[2] * b[2];
  return [ad + be, bd + ce, be + cf];
}

export function bigFib(n: bigint): bigint {
  if (n < 1) {
    return 0n;
  }
  let a = [1n, 1n, 0n];
  let b = [1n, 1n, 0n];
  --n;
  while (n > 0n) {
    if (n & 1n) {
      b = bmmul(b, a);
    }
    n >>= 1n;
    a = bmmul(a, a);
  }
  return b[1];
}
