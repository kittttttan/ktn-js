/**
 * Fibonacci number
 *
 * F0 = 0
 * F1 = 1
 * Fn+2 = Fn + Fn-1 (n >= 0)
 */

/**
 * generate Fibonacci numbers
 */
export function* fibonacci(): Generator<number> {
  yield 0;

  let [a, b]: number[] = [1, 0];
  while (true) {
    yield a;
    [a, b] = [a + b, a];
  }
}

export function* bigFibonacci(): Generator<bigint> {
  yield 0n;

  let [a, b]: bigint[] = [1n, 0n];
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
function mmul(a: number[], b: number[]): number[] {
  const ad: number = a[0] * b[0];
  const be: number = a[1] * b[1];
  const bd: number = a[1] * b[0];
  const ce: number = a[2] * b[1];
  const cf: number = a[2] * b[2];
  return [ad + be, bd + ce, be + cf];
}

/**
 * nth Fibonacci number
 *
 * |1 1|^n   |Fn+1 Fn  |
 * |   |   = |         |
 * |1 0|     |Fn   Fn-1|
 */
export function fib(n: number): number {
  if (n < 1) {
    return 0;
  }
  let a: number[] = [1, 1, 0];
  let b: number[] = [1, 1, 0];
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
  const ad: bigint = a[0] * b[0];
  const be: bigint = a[1] * b[1];
  const bd: bigint = a[1] * b[0];
  const ce: bigint = a[2] * b[1];
  const cf: bigint = a[2] * b[2];
  return [ad + be, bd + ce, be + cf];
}

export function bigFib(n: bigint): bigint {
  if (n < 1) {
    return 0n;
  }
  let a: bigint[] = [1n, 1n, 0n];
  let b: bigint[] = [1n, 1n, 0n];
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
