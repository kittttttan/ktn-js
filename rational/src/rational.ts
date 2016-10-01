/// <reference path="../node_modules/@ktn/type/typings/integer.d.ts" />
/**
 * Rational
 */
'use strict';

import '@ktn/core';

/**
 * @private
 * @requires Integer
 */
import Integer from '@ktn/integer';

/**
 * Rational
 *
 * @class Rational
 * @property {!Integer} Rational#_n Numerator
 * @property {!Integer} Rational#_d Denominator
 */
export default class Rational implements ktn.Field {
  protected _n: Integer;
  protected _d: Integer;

  /**
   * @param {!Integer} n
   * @param {!Integer} d
   * @param {boolean=} f If f is true then skip cancel().
   */
  constructor(n: Integer, d: Integer, f?: boolean) {
    if (f) {
      this._n = n;
      this._d = d;
    } else {
      const t: Integer[] = Rational.cancel(n, d);
      this._n = t[0];
      this._d = t[1];
    }
  }

  /**
   * 1
   * @static
   * @method Rational.one
   * @return {!Rational} 1
   */
  static get one(): Rational {
    return new Rational(Integer.one, Integer.one, true);
  }

  /**
   * 0
   * @static
   * @method Rational.zero
   * @return {!Rational} 0
   */
  static get zero(): Rational {
    return new Rational(Integer.zero, Integer.one, true);
  }

  /**
   * Convert Number to Rational.
   * @static
   * @method Rational.num
   * @param {!int} a Numerator
   * @param {!int=} b Denominator
   * @param {boolean=} c
   * @return {!Rational}
   */
  public static num(a: int, b?: int, c?: boolean): Rational {
    if (!b) {
      return new Rational(Integer.num(a), Integer.one, true);
    }
    return new Rational(Integer.num(a), Integer.num(b), c);
  }

  /**
   * Convert String to Rational.
   * @static
   * @method Rational.str
   * @param {!string} a ex.'-1/2', '0.1/1.02'.
   * @return {!Rational}
   */
  public static str(a: string): Rational {
    const as: string[] = a.split('/');
    as[1] = as[1] || '1';

    // sign
    const [s1, s2]: boolean[] = [as[0][0] === '-', as[1][0] === '-'];
    as[0] = as[0].replace(/[\-\+]/g, '');
    as[1] = as[1].replace(/[\-\+]/g, '');

    // dot
    const [d1, d2]: number[] = [as[0].indexOf('.'), as[1].indexOf('.')];
    const [l1, l2]: number[] = [d1 < 0 ? 0 : as[0].length - d1 - 1, d2 < 0 ? 0 : as[1].length - d2 - 1];
    as[0] = as[0].replace('.', '').replace(/^0*(\d+)$/, '$1');
    as[1] = as[1].replace('.', '').replace(/^0*(\d+)$/, '$1');
    if (l1 > l2) {
      as[1] = `${as[1]}${'0'.repeat(l1 - l2)}`;
    } else if (l1 < l2) {
      as[0] = `${as[0]}${'0'.repeat(l2 - l1)}`;
    }

    // sign
    if (s1 !== s2) {
      as[0] = `-${as[0]}`;
    }

    return new Rational(Integer.str(as[0]), Integer.str(as[1]));
  }

  /**
   * Convert anything to Rational.
   * @static
   * @method Rational.any
   * @param {!*} a
   * @param {!*=} b
   * @throws {Error} ZeroDivisionError
   * @return {!Rational}
   */
  public static any(a: any, b?: any): Rational {
    if (!arguments.length) {
      return Rational.zero;
    }
    if (arguments.length === 1) {
      if (a instanceof Rational) { return a.clone(); }
      if (typeof a === 'string') { return Rational.str(a); }
      return new Rational(Integer.any(a), Integer.one, true);
    }
    if (!b) {
      throw new Error('zero division');
    }
    if (!a) { return Rational.zero; }
    return new Rational(Integer.any(a), Integer.any(b));
  }

  /**
   * @static
   * @method Rational.cancel
   * @param {!Integer} a
   * @param {!Integer} b
   * @return {!Array<!Integer>}
   */
  public static cancel(a: Integer, b: Integer): Integer[] {
    const g: Integer = a.gcd(b);
    a = a.div(g);
    b = b.div(g);
    if (!b.sign) {
      a.sign = !a.sign;
      b.sign = true;
    }
    return [a, b];
  }

  /**
   * @method Rational#clone
   * @return {!Rational}
   */
  public clone(): Rational {
    return new Rational(this._n, this._d, true);
  }

  /**
   * @method Rational#toString
   * @return {!string}
   */
  public toString(): string {
    if (this._d.equal(Integer.one)) { return this._n.toString(); }
    return `${this._n}/${this._d}`;
  }

  /**
   * @method Rational#html
   * @return {!string}
   */
  public html(): string {
    return this.toString();
  }

  /**
   * @method Rational#tex
   * @return {!string}
   */
  public tex(): string {
    // if (this._d == 1) {return this._n.toString();}
    return `\\frac{${this._n}}{${this._d}}`;
  }

  get sign(): boolean {
    return this._n.sign;
  }

  /**
   * @method Rational#abs
   * @return {!Rational} |this|.
   */
  public abs(): Rational {
    return new Rational(this._n.abs(), this._d, true);
  }

  /**
   * @method Rational#neg
   * @return {!Rational} -this.
   */
  public neg(): Rational {
    return new Rational(this._n.neg(), this._d, true);
  }

  /**
   * @method Rational#eq
   * @param {!?} b
   * @return {!boolean} this == b.
   */
  public eq(b: any): boolean {
    b = Rational.any(b);
    if (this._n.eq(b._n) && this._d.eq(b._d)) { return true; }
    return false;
  }

  /**
   * @method Rational#equal
   * @param {!Rational} b
   * @return {!boolean} this === b.
   */
  public equal(b: Rational): boolean {
    if (!(b instanceof Rational)) { return false; }
    if (this._n.equal(b._n) && this._d.equal(b._d)) { return true; }
    return false;
  }

  /**
   * @method Rational#cmp
   * @param {!Rational} b
   * @return {!int}
   *   1 (this > b)
   *   0 (this = b)
   *  -1 (this < b).
   */
  public cmp(b: Rational): int {
    return this._n.mul(b._d).cmp(this._d.mul(b._n));
  }

  /**
   * Multiplicative inverse (or reciprocal)
   * @method Rational#inv
   * @return {!Rational}
   */
  public inv(): Rational {
    const n: Integer = this._n;
    const d: Integer = this._d;
    if (!n.isNonZero()) {
      throw new Error('zero division');
    }
    if (!n.sign) {
      return new Rational(d.neg(), n.neg(), true);
    }
    return new Rational(d, n, true);
  }

  /**
   * @method Rational#add
   * @param {!Rational} b
   * @return {!Rational} this + b.
   */
  public add(b: Rational): Rational {
    return new Rational(
        this._n.mul(b._d).add(this._d.mul(b._n)),
        this._d.mul(b._d));
  }

  /**
   * @method Rational#sub
   * @param {!Rational} b
   * @return {!Rational} this - b.
   */
  public sub(b: Rational): Rational {
    return new Rational(
        this._n.mul(b._d).sub(this._d.mul(b._n)),
        this._d.mul(b._d));
  }

  /**
   * @method Rational#mul
   * @param {!Rational} b
   * @return {!Rational} this * b.
   */
  public mul(b: Rational): Rational {
    return new Rational(this._n.mul(b._n), this._d.mul(b._d));
  }

  /**
   * @method Rational#div
   * @param {!Rational} b
   * @return {!Rational} this / b.
   */
  public div(b: Rational): Rational {
    return new Rational(this._n.mul(b._d), this._d.mul(b._n));
  }

  /**
   * @method Rational#pow
   * @param {!int} b
   * @return {!Rational} this ^ b.
   */
  public pow(b: int): Rational {
    return new Rational(this._n.pow(b), this._d.pow(b), true);
  }
}
