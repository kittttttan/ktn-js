/**
 * Fibonacci number
 *
 * F0 = 0
 * F1 = 1
 * Fn+2 = Fn + Fn-1 (n >= 0)
 */

/**
 * generate Fibonacci numbers
 * @private
 */
function *generate() {
  yield 0;

  let a: number = 1;
  let b: number = 0;
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
 * @param {!Array<number>} a
 * @param {!Array<number>} b
 * @return {!Array<number>}
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
 * Fibonacci
 * @class Fibonacci
 */
export class Fibonacci {
  /**
   * nth Fibonacci number
   * @param {!number} n
   * @return {!number}
   */
  static _fib(n: number): number {
    if (n < 1) {
      return 0;
    }
    let a: number = 1;
    let b: number = 0;
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
   * @param {!number} n
   * @return {!number}
   */
  static fib(n: number): number {
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

  /**
   * generate first nth Fibonacci numbers
   * @param {!number} n
   * @return {!Iterator}
   */
  static top(n: number) {
    return function *() {
      if (n < 1) {
        throw new Error('arguments[0] must > 0');
      }
      const g = generate();
      while (n--) {
        yield g.next().value;
      }
    }();
  }

  /**
   * generate Fibonacci numbers less than n
   * @param {!number} n
   * @return {!Iterator}
   */
  static max(n: number) {
    return function *() {
      const g = generate();
      let f: number = g.next().value;
      while (f < n) {
        yield f;
        f = g.next().value;
      }
    }();
  }
}
