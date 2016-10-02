/// <reference path="../node_modules/@ktn/type/typings/ktn.d.ts" />
/**
 * Fibonacci number
 *
 * F0 = 0
 * F1 = 1
 * Fn+2 = Fn + Fn-1 (n >= 0)
 */
'use strict';

/**
 * generate Fibonacci numbers
 * @private
 */
function *generate(): IterableIterator<int> {
  yield 0;

  let [a, b]: int[] = [1, 0];
  while (true) {
    yield a;
    [a, b] = [a + b, a];
  }
}

/**
 * |a b|   |d e|   |ad+be bd+ce|
 * |   | x |   | = |           |
 * |b c|   |e f|   |bd+ce be+cf|
 *
 * @private
 * @param {!Array<int>} a
 * @param {!Array<int>} b
 * @return {!Array<int>}
 */
function mmul(a: int[], b: int[]): int[] {
  const ad: int = a[0] * b[0];
  const be: int = a[1] * b[1];
  const bd: int = a[1] * b[0];
  const ce: int = a[2] * b[1];
  const cf: int = a[2] * b[2];
  return [ad + be, bd + ce, be + cf];
}

/**
 * Fibonacci
 * @class Fibonacci
 */
export default class Fibonacci {
  /**
   * nth Fibonacci number
   * @param {!int} n
   * @return {!int}
   */
  public static _fib(n: int): int {
    if (n < 1) {
      return 0;
    }
    let [a, b]: int[] = [1, 0];
    while (--n) {
      [a, b] = [a + b, a];
    }
    return a;
  }

  /**
   * nth Fibonacci number
   *
   * |1 1|^n   |Fn+1 Fn  |
   * |   |   = |         |
   * |1 0|     |Fn   Fn-1|
   *
   * @param {!int} n
   * @return {!int}
   */
  public static fib(n: int): int {
    if (n < 1) {
      return 0;
    }
    let a: int[] = [1, 1, 0];
    let b: int[] = [1, 1, 0];
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

  /**
   * generate first nth Fibonacci numbers
   * @param {!int} n
   * @return {!Iterator}
   */
  public static top(n: int): IterableIterator<int> {
    return function *(): IterableIterator<int> {
      if (n < 1) {
        throw new Error('arguments[0] must > 0');
      }
      const g: IterableIterator<int> = generate();
      while (n--) {
        yield g.next().value;
      }
    }();
  }

  /**
   * generate Fibonacci numbers less than n
   * @param {!int} n
   * @return {!Iterator}
   */
  public static max(n: int): IterableIterator<int> {
    return function *(): IterableIterator<int> {
      const g: IterableIterator<int> = generate();
      let f: int = g.next().value;
      while (f < n) {
        yield f;
        f = g.next().value;
      }
    }();
  }
}
