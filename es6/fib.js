/**
 * Fibonacci number
 * 
 * F0 = 0
 * F1 = 1
 * Fn+2 = Fn + Fn-1 (n >= 0)
 */
'use strict';

const range = require('./range').range;

/**
 * nth Fibonacci number
 * @param {number} n
 * @return {number}
 */
let _fib = (n) => {
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
};

/**
 * nth Fibonacci number
 * @param {number} n
 * @return {number}
 */
let _fib2 = (n) => {
    'use asm';

    n = n | 0;
    if ((n | 0) < 1) {
        return 0;
    }
    let a = 1;
    let b = 0;
    while (true) {
        n = (n - 1) | 0;
        if (!n) { break; }
        let t = (a + b) | 0;
        b = a | 0;
        a = t | 0;
    }
    return a | 0;
};

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
let fib = (n) => {
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
};

/**
 * |a b|   |d e|   |ad+be bd+ce|
 * |   | x |   | = |           |
 * |b c|   |e f|   |bd+ce be+cf|
 * 
 * @param {number[]} a
 * @param {number[]} b
 */
let mmul = (a, b) => {
    let ad = a[0] * b[0];
    let be = a[1] * b[1];
    let bd = a[1] * b[0];
    let ce = a[2] * b[1];
    let cf = a[2] * b[2];
    return [ad + be, bd + ce, be + cf];
};

/**
 * generate Fibonacci numbers
 */
function* genFib() {
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
 * generate first nth Fibonacci numbers
 * @param {number} n
 * @return {Iterator}
 */
let fibTop = (n) => {
    return (function*() {
        if (n < 1) {
            throw new Exception('argument[0] must > 0');
        }
        let g = genFib();
        while (n--) {
            yield g.next().value;
        }
    }());
};

/**
 * generate Fibonacci numbers less than n
 * @param {number} n
 * @return {Iterator}
 */
let fibMax = (n) => {
    return (function*() {
        let g = genFib();
        let f = g.next().value;
        while (f < n) {
            yield f;
            f = g.next().value;
        }
    }());
};

module.exports = {
  _fib: _fib,
  _fib2: _fib2,
  fib: fib,
  fibTop: fibTop,
  fibMax: fibMax
};
