/**
 * statistics
 */
'use strict';

import {int, double} from '@ktn/type';

export class StatUtil {
  /**
   * factorial
   * @param {int} a
   * @return {int} a!
   */
  public static fact(a: int): int {
    a = a | 0;
    if (a < 2) { return 1; }
    let b: int = 1;
    while (a > 1) {
      b *= a--;
    }
    return b;
  }

  /**
   * @param {Array<number>} arr
   * @return {Array<number>}
   */
  public static sortNum(arr: number[]): number[] {
    return arr.sort((a: number, b: number): number => a - b);
  }

  /**
   * @param {Array<number>} arr
   * @return {number}
   */
  public static median(arr: number[]): number {
    // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[(arr.length - 1) / 2 | 0];
    return StatUtil.sortNum(Array.prototype.concat.apply(arr))[(arr.length - 1) / 2 | 0];
  }

  /**
   * @param {Array<number>} arr
   * @return {number}
   */
  public static midrange(arr: number[]): number {
    // const a = Reflect.apply(Array.prototype.concat, undefined, arr);
    const a: number[] = Array.prototype.concat.apply(arr);
    return (a[0] + a[a.length - 1]) / 2;
  }

  /**
   * arithmetic mean
   * @param {Array<number>} arr
   * @return {number}
   */
  public static amean(arr: number[]): number {
    let s: number = 0;
    const l: int = arr.length;
    let i: int = l;
    while (i--) {
      s += arr[i];
    }
    return s / l;
  }

  /**
   * geometric mean
   * @param {Array<number>} arr
   * @return {number}
   */
  public static gmean(arr: number[]): number {
    let s: int = 1;
    const l: int = arr.length;
    let i: int = l;
    while (i--) {
      s *= arr[i];
    }
    return Math.pow(s, 1.0 / l);
  }

  /**
   * Harmonic mean
   * @param {Array<number>} arr
   * @return {number}
   */
  public static hmean(arr: number[]): number {
    let s: int = 0;
    const l: int = arr.length;
    let i: int = l;
    while (i--) {
      s += 1.0 / arr[i];
    }
    return l / s;
  }

  /**
   * Generalized mean
   * @param {Array<number>} arr
   * @param {number} p
   * @return {number}
   */
  public static genmean(arr: number[], p: number): number {
    if (!p) { return StatUtil.gmean(arr); }
    if (p === -Infinity) {
      // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[0];
      return StatUtil.sortNum(Array.prototype.concat.apply(arr))[0];
    }
    if (p === Infinity) {
      // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[arr.length - 1];
      return StatUtil.sortNum(Array.prototype.concat.apply(arr))[arr.length - 1];
    }
    let s: number = 0;
    const l: int = arr.length;
    let i: int = l;
    while (i--) {
      s += Math.pow(arr[i], p);
    }
    return Math.pow(s / l, 1.0 / p);
  }

  /**
   * @param {Array<number>} arr
   * @return {number}
   */
  public static variance(arr: number[]): number {
    let [s, s2]: number[] = [0, 0];
    const l: int = arr.length;
    let i: int = l;
    while (i--) {
      s += arr[i];
      s2 += arr[i] * arr[i];
    }
    return (s2 * l - s * s) / (l * l);
  }

  /**
   * Permutation
   * @param {int} n
   * @param {int} m
   * @return {int}
   */
  public static nPm(n: int, m: int): int {
    if (n < 0) { throw new Error(`nPm(n = ${n}, m = ${m}): n must not < 0`); }
    m = m || 0;
    let a: int = 1;
    while (n - m > 0) { a *= n--; }
    return a;
  }

  /**
   * Combination
   * @param {int} n
   * @param {int} m
   * @return {int}
   */
  public static nCm(n: int, m: int): int {
    return (n < m || m < 0) ? 0 :
      StatUtil.fact(n) / (StatUtil.fact(n - m) * StatUtil.fact(m));
  }

  /**
   * error function
   * erf(x) = 2/\sqrt{\pi} \int_{x}^{0} e^[-t^2} dt
   */
  public static erf(x: double): double {
    if (x === 0) { return 0; }
    if (x === Infinity) { return 1; }
    if (x < 0) { return -StatUtil.erf(-x); }
    if (x < 2) {
      // return 1.1283791670955126 * Math.exp(-x * x) * (x + 2 * Math.pow(x, 3) / 3 + 4 * Math.pow(x, 5) / 15);
      // 2/Math.sqrt(Math.PI) = 1.1283791670955126
      return 1.1283791670955126
        * (x
          - Math.pow(x, 3) / 3
          + Math.pow(x, 5) / 10
          - Math.pow(x, 7) / 42
          + Math.pow(x, 9) / 216
          - Math.pow(x, 11) / 1320
          + Math.pow(x, 13) / 9360
          - Math.pow(x, 15) / 75600
          + Math.pow(x, 17) / 685440
          - Math.pow(x, 19) / 6894720
          + Math.pow(x, 21) / 76204800
          - Math.pow(x, 23) / 918086400
          + Math.pow(x, 25) / 11975040000
          - Math.pow(x, 27) / 168129561600
          + Math.pow(x, 29) / 2528170444800
          - Math.pow(x, 31) / 40537905408000
        );
    }
    return 1 - 0.5641895835477563 * Math.exp(-x * x)
      * (1 / x
        - 0.5 * Math.pow(x, -3)
        + 0.75 * Math.pow(x, -5)
        - 15 * Math.pow(x, -7) / 8
        - 105 * Math.pow(x, -9) / 16
        + 945 * Math.pow(x, -11) / 32
        - 10395 * Math.pow(x, -13) / 64
        + 135135 * Math.pow(x, -15) / 128
        - 2027025 * Math.pow(x, -17) / 256
      );
    // 1/Math.sqrt(Math.PI) = 0.5641895835477563
  }
}

/**
 * @class Triangular
 */
export class Triangular {
  protected _low: double;
  protected _high: double;
  protected _mode: double;

  public constructor(low: double = 0.0, high: double = 1.0, mode: double = .5) {
    this._low = low;
    this._high = high;
    this._mode = mode;
  }

  public toString(): string {
    return `Triangular(${this._low}, ${this._high}, ${this._mode})`;
  }

  public valueOf(): double {
    let u: double = Math.random();
    let l: double = this._low;
    let h: double = this._high;
    const m: double = this._mode;
    let c: double = (m - l) / (h - l);
    if (u > c) {
      u = 1.0 - u;
      c = 1.0 - c;
      h = this._low;
      l = this._high;
    }
    return l + (h - l) * Math.pow(u * c, .5);
  }

  public gen(n: int = 1): double[] {
    const arr: double[] = [];
    const m: double = this._mode;
    let l: double = this._low;
    let h: double = this._high;
    let c: double = (m - l) / (h - l);
    for (let i: int = 0; i < n; i++) {
      let u: double = Math.random();
      if (u > c) {
        u = 1.0 - u;
        c = 1.0 - c;
        h = this._low;
        l = this._high;
      }
      arr[i] = l + (h - l) * Math.pow(u * c, .5);
    }
    return arr;
  }
}

/**
 * Bernoulli distribution
 * @class Be
 */
export class Be {
  protected p: double;
  /**
   * @param {number} p 0 <= p <= 1
   */
  public constructor(p: double) {
    this.p = (p > 1) ? 1 :
             (p > 0) ? p : 0;
  }

  public toString(): string {
    return `Be(${this.p})`;
  }

  public P(): double {
    return this.p;
  }

  public E(): double {
    return this.p;
  }

  public V(): double {
    return this.p * (1 - this.p);
  }

  public gen(n: int = 1): int[] {
    const arr: int[] = [];
    while (n--) {
      const r: number = Math.random();
      arr[n] = (r > this.p ? 0 : 1);
    }
    return arr;
  }
}

/**
 * Binomial distribution
 * @class B
 */
export class B {
  protected n: int;
  protected p: double;
  /**
   * @param {int} n n > 0
   * @param {double} p 0 <= p <= 1
   */
  public constructor(n: int, p: double) {
    n |= 0;
    this.n = n;
    this.p = (p > 1) ? 1 :
             (p > 0) ? p : 0;
  }

  public toString(): string {
    return `B(${this.n}, ${this.p})`;
  }

  public P(k: int): double {
    return StatUtil.nCm(this.n, k) * Math.pow(this.p, k) *
           Math.pow(1 - this.p, this.n - k);
  }

  public E(): double {
    return this.n * this.p;
  }

  public V(): double {
    return this.n * this.p * (1 - this.p);
  }

  public gen(n: int = 1): int[] {
    let i: int = n;
    const arr: int[] = [];
    while (i--) {
      let p: int = 0;
      let j: int = this.n;
      while (j--) {
        if (Math.random() > this.p) {
          ++p;
        }
      }
      arr[i] = p;
    }
    return arr;
  }
}

/**
 * Exponential distribution
 * @class Exp
 */
export class Exp {
  protected l: double;
  /**
   * @param {number} l l > 0
   */
  public constructor(l: double) {
    this.l = (l > 0) ? l : 1;
  }

  public toString(): string {
    return `Exp(${this.l})`;
  }

  public P(x: double): double {
    return 1 - Math.pow(Math.E, -this.l * x);
  }

  public E(): double {
    return 1.0 / this.l;
  }

  public V(): double {
    return 1.0 / (this.l * this.l);
  }

  public gen(n: int = 1): double[] {
    let i: int = n;
    const arr: double[] = [];
    while (i--) {
      let r: double = Math.random();
      while (r <= 1e-7) { r = Math.random(); }
      arr[i] = -Math.log(r) / this.l;
    }
    return arr;
  }
}

/**
 * Normal distribution
 * @class Norm
 */
export class Norm {
  protected m: double;
  protected s: double;
  /**
   * Normal distribution
   * @param {number} m
   * @param {number} s
   */
  public constructor(m: double, s: double) {
    this.m = m;
    this.s = s;
  }

  /**
   * @override
   * @return {string}
   */
  public toString(): string {
    return `Norm(${this.m},${this.s})`;
  }

  public P(x: double): double {
    return 0.5 * (1 + StatUtil.erf((x - this.m) / (this.s * 1.4142135623730951)));
    // Math.sqrt(2) = 1.4142135623730951
  }

  public E(): double {
    return this.m;
  }

  public V(): double {
    return this.s * this.s;
  }

  public gen(n: int = 1): double[] {
    const arr: double[] = [];
    let i: int = n;
    while (i--) {
      let z: double;
      while (true) {
        const r1: double = Math.random();
        const r2: double = 1 - Math.random();
        z = 1.7155277699214135 * (r1 - 0.5) / r2;
        // 4 * exp(-0.5)/sqrt(2.0) = 1.7155277699214135
        const zz: double = z * z / 4.0;
        if (zz <= -Math.log(r2)) {
          break;
        }
      }
      arr[i] = this.m + z * this.s;
    }
    return arr;
  }
}
