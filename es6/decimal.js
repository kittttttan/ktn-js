/**
 * Decimal in JavaScript.
 * @example
 *    var Decimal = require('/path/to/decimal.js').Decimal;
 *    var a = Decimal.num(7, -3);
 *    var b = Decimal.str('100.1');
 *    var c = a.mul(b);
 *    a.toString();  // '0.007'
 *    b.toString();  // '100.1'
 *    c.toString();  // '0.7007'
 */

 /**
  * @requires Integer
  */
import {Integer} from './integer';

/**
 * Decimal
 * @class Decimal
 */
export class Decimal {
  /**
   * 0
   * @static
   * @method Decimal.zero
   * @return {!Decimal} 0.
   */
  static get zero() { return Decimal.num(0, 0); }

  /**
   * 1
   * @static
   * @method Decimal.one
   * @return {!Decimal} 1.
   */
  static get one() { return Decimal.num(1, 0); }

  /**
   * Convert Fraction to Decimal.
   * @static
   * @method Decimal.rat
   * @param {Rational} a
   * @param {number} b
   * @return {Decimal}
   */
  //static rat(a, b) {
  //  return new Decimal(a._n, 0).div(new Decimal(a._d, 0), b);
  //}

  /**
   * Convert String to Decimal.
   * @static
   * @method Decimal.str
   * @param {!string} str
   * @return {!Decimal}
   */
  static str(str) {
    const index = str.indexOf('.');
    if (index < 0) {
      // '.' is not found
      return new Decimal(Integer.str(str), 0);
    }
    let trim = str.substring(0, index) + str.substring(index + 1);
    let i = 0;
    while (trim.charAt(i) === '0') { ++i; }
    if (i) { trim = trim.substring(i); }
    return new Decimal(Integer.str(trim), index - str.length + 1);
  }

  /**
   * Convert Number to Decimal.
   * @static
   * @method Decimal.num
   * @param {!number} a
   * @param {number=} b
   * @return {!Decimal}
   */
  static num(a, b) {
    return new Decimal(Integer.num(a), b);
  }

  /**
   * Convert anything to Decimal.
   * @static
   * @method Decimal.dec
   * @param {*} l
   * @param {*} e
   * @return {!Decimal}
   */
  static dec(l, e) {
    if (!arguments.length) {
      return new Decimal(new Integer(), 0);
    }
    if (arguments.length === 1) {
      if (l instanceof Decimal) { return l.clone(); }
      if (typeof l === 'string') { return Decimal.str(l); }
      return new Decimal(Integer.any(l), 0);
    }
    return new Decimal(Integer.any(l), e | 0);
  }

  /**
   * @param {!Integer} l
   * @param {number=} e
   */
  constructor(l, e) {
    e = e | 0;

    /**
     * @private
     * @property {!Integer} Decimal#_l
     */
    this._l = l;

    /**
     * @private
     * @property {!number} Decimal#_e
     */
    this._e = e;
  }

  /**
   * Copy Decimal.
   * @method Decimal#clone
   * @return {!Decimal}
   */
  clone() {
    return new Decimal(this._l.clone(), this._e);
  }

  /**
   * @method Decimal#toString
   * @return {!string}
   */
  toString() {
    if (this._e >= 0) {
      return this._l.addZero(this._e).toString();
    }

    const sign = this._l._s;
    const str = this._l.toString();
    let n = -this._e - str.length;
    if (!sign) { n = n + 1; }

    if (n < 0) {
      return `${str.slice(0, this._e)}.${str.slice(this._e)}`;
    }

    const zeros = '0'.repeat(n);
    if (!sign) {
      return `-0.${zeros}${str.substring(1)}`;
    }
    return `0.${zeros}${str}`;
  }

  /**
   * @method Decimal#html
   * @return {!string}
   */
  html() {
    return `${this._l.toString()}&times;10<sup>${this._e}</sup>`;
  }

  /**
   * @method Decimal#tex
   * @return {!string}
   */
  tex() {
    return `${this._l.toString()}\times 10^${this._e}`;
  }

  /**
   * @method Decimal#dot
   * @return {!number}
   */
  dot() {
    const e = this._e < 0 ? -this._e : 0;
    return this._l.toString().length - e;
  }

  /**
   * @method Decimal#floor
   * @return {!Integer}
   */
  floor() {
    return Integer.str(this._l.toString().substring(0, this.dot()));
  }

  /**
   * @method Decimal#setLen
   * @return {!Decimal}
   */
  setLen(n) {
    const a = this.clone();
    const str = a._l.toString();
    const diff = n - str.length;
    if (diff < 0) {
      a._l = Integer.str(str.substring(0, n));
      a._e -= diff;
    } else {
      a._l = Integer.str(str + '0'.repeat(diff));
    }
    return a;
  }

  /**
   * @method Decimal#abs
   * @return {!Decimal}
   */
  abs() {
    const a = this.clone();
    a._l._s = true;
    return a;
  }

  /**
   * @method Decimal#neg
   * @return {!Decimal}
   */
  neg() {
    const a = this.clone();
    a._l._s = !a._l._s;
    return a;
  }

  /**
   * @method Decimal#trim
   * @return {!Decimal}
   */
  trim() {
    const a = this.clone();
    let str = a._l.toString();
    let i = str.length - 1;
    while (i >= 0 && str.charAt(i) === '0') {
      ++a._e;
      --i;
    }
    str = str.substring(0, i + 1);
    a._l = Integer.str(str);
    return a;
  }

  /**
   * ==
   * @method Integer#eq
   * @param {!Integer} b
   * @return {!boolean}
   */
  eq(b) {
    if (this === b) { return true; }

    b = Decimal.dec(b);
    return this._e === b._e && this._l.eq(b._l);
  }

  /**
   * ===
   * @method Integer#equal
   * @param {!Integer} b
   * @return {!boolean}
   */
  equal(b) {
    if (this === b) { return true; }
    if (!(b instanceof Decimal)) { return false; }

    return this._e === b._e && this._l.eq(b._l);
  }

  /**
   * @method Decimal#add
   * @param {!Decimal} b
   * @return {!Decimal}
   */
  add(b) {
    const diff = this._e - b._e;
    if (diff > 0) {
      return new Decimal(this._l.addZero(diff).add(b._l), b._e);
    }
    if (diff < 0) {
      return new Decimal(this._l.add(b._l.addZero(-diff)), this._e);
    }
    return new Decimal(this._l.add(b._l), this._e);
  }

  /**
   * @method Decimal#sub
   * @param {!Decimal} b
   * @return {!Decimal}
   */
  sub(b) {
    const diff = this._e - b._e;
    if (diff > 0) {
      return new Decimal(this._l.addZero(diff).sub(b._l), b._e);
    }
    if (diff < 0) {
      return new Decimal(this._l.sub(b._l.addZero(-diff)), this._e);
    }
    return new Decimal(this._l.sub(b._l), this._e);
  }

  /**
   * @method Decimal#mul
   * @param {!Decimal} b
   * @return {!Decimal}
   */
  mul(b) {
    const diff = this._e + b._e;
    return new Decimal(this._l.mul(b._l), diff);
  }

  /**
   * @method Decimal#div
   * @param {!Decimal} b
   * @param {!number} c
   * @return {!Decimal}
   */
  div(b, c) {
    c = c || 20;
    const diff = this._l.toString().length - b._l.toString().length;
    const e = this._e - b._e;
    const f = b._e;
    if (diff < 0) {
      return new Decimal(this._l.addZero(c - diff + 1 - f).div(b._l),
                                 -c + diff - 1 + e + f).trim();
    }
    return new Decimal(this._l.addZero(c - f).div(b._l), -c + e + f).trim();
  }
}
