/**
 * Fibonacci number
 * 
 * F0 = 0
 * F1 = 1
 * Fn+2 = Fn + Fn-1 (n >= 0)
 */
'use strict';

import {range} from './range.js';

/**
 * generate Fibonacci numbers
 */
function* generate() {
  yield 0;

  let a = 1;
  let b = 0;
  while (1) {
    yield a;
    let t = a + b;
    b = a;
    a = t;
  }
}

/**
 * |a b|   |d e|   |ad+be bd+ce|
 * |   | x |   | = |           |
 * |b c|   |e f|   |bd+ce be+cf|
 * 
 * @param {number[]} a
 * @param {number[]} b
 */
function mmul(a, b) {
  let ad = a[0] * b[0];
  let be = a[1] * b[1];
  let bd = a[1] * b[0];
  let ce = a[2] * b[1];
  let cf = a[2] * b[2];
  return [ad + be, bd + ce, be + cf];
}

export class Fibonacci {
  /**
   * nth Fibonacci number
   * @param {number} n
   * @return {number}
   */
  static _fib(n) {
    if (n < 1) {
      return 0;
    }
    let a = 1;
    let b = 0;
    while (--n) {
      let t = a + b;
      b = a;
      a = t;
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
   * @param {number} n
   * @return {number}
   */
  static fib(n) {
    if (n < 1) {
      return 0;
    }
    let a = [1,1,0];
    let b = [1,1,0];
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
   * @param {number} n
   * @return {Iterator}
   */
  static top(n) {
    return (function*() {
      if (n < 1) {
        throw new Error('arguments[0] must > 0');
      }
      let g = generate();
      while (n--) {
        yield g.next().value;
      }
    }());
  }

  /**
   * generate Fibonacci numbers less than n
   * @param {number} n
   * @return {Iterator}
   */
  static max(n) {
    return (function*() {
      let g = generate();
      let f = g.next().value;
      while (f < n) {
        yield f;
        f = g.next().value;
      }
    }());
  }
}