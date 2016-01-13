/**
 * Rational
 * @example
 *    var Rational = require('/path/to/rational.js').Rational;
 *    var a = Rational.num(2, 3);
 *    var b = Rational.str('-3/12');
 *    var c = a.add(b);
 *    a.toString();  // '(2/3)'
 *    b.toString();  // '(-1/4)'
 *    c.toString();  // '(5/12)'
 */

 /**
  * @requires Integer
  */
import {Integer} from './integer';

/**
 * Rational
 *
 * @class Rational
 */
export class Rational {
  /**
   * Numerator
   * @private
   * @property {!Integer} Rational#_n
   */
  _n: Integer;

  /**
   * Denominator
   * @private
   * @property {!Integer} Rational#_d
   */
  _d: Integer;

  /**
   * Rational
   * @class Rational
   * @param {!Integer} n
   * @param {!Integer} d
   * @param {boolean=} f If f is true then skip cancel().
   */
  constructor(n, d, f?) {
    if (f) {
      this._n = n;
      this._d = d;
    } else {
      const t = Rational.cancel(n, d);
      this._n = t[0];
      this._d = t[1];
    }
  }

  /**
   * 1/1
   * @static
   * @method Rational.one
   * @return {!Rational} 1/1.
   */
  static get one() {
    return new Rational(Integer.one, Integer.one, true);
  }

  /**
   * 0/1
   * @static
   * @method Rational.zero
   * @return {!Rational} 0/1.
   */
  static get zero() {
    return new Rational(Integer.zero, Integer.one, true);
  }

  /**
   * Convert Number to Rational.
   * @static
   * @method Rational.num
   * @param {!number} a Numerator
   * @param {!number=} b Denominator
   * @param {boolean=} c
   * @return {!Rational}
   */
  static num(a, b, c) {
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
  static str(a) {
    const as = a.split('/');
    as[1] = as[1] || '1';

    // sign
    const [s1, s2] = [as[0][0] === '-', as[1][0] === '-'];
    as[0] = as[0].replace(/[\-\+]/g, '');
    as[1] = as[1].replace(/[\-\+]/g, '');

    // dot
    const [d1, d2] = [as[0].indexOf('.'), as[1].indexOf('.')];
    const [l1, l2] = [d1 < 0 ? 0 : as[0].length - d1 - 1, d2 < 0 ? 0 : as[1].length - d2 - 1];
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
  static any(a, b?) {
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
  static cancel(a, b) {
    const g = a.gcd(b);
    a = a.div(g);
    b = b.div(g);
    if (!b._s) {
      a._s = !a._s;
      b._s = true;
    }
    return [a, b];
  }

  /**
   * @method Rational#clone
   * @return {!Rational}
   */
  clone() {
    return new Rational(this._n, this._d, true);
  }

  /**
   * @method Rational#toString
   * @return {!string}
   */
  toString() {
    if (this._d.equal(Integer.one)) { return this._n.toString(); }
    return `${this._n}/${this._d}`;
  }

  /**
   * @method Rational#html
   * @return {!string}
   */
  html() { return this.toString(); }

  /**
   * @method Rational#tex
   * @return {!string}
   */
  tex() {
    //if (this._d == 1) {return this._n.toString();}
    return `\\frac{${this._n}}{${this._d}}`;
  }

  /**
   * @method Rational#abs
   * @return {!Rational} |this|.
   */
  abs() {
    return new Rational(this._n.abs(), this._d, true);
  }

  /**
   * @method Rational#neg
   * @return {!Rational} -this.
   */
  neg() {
    return new Rational(this._n.neg(), this._d, true);
  }

  /**
   * @method Rational#eq
   * @param {!Rational} b
   * @return {!boolean} this == b.
   */
  eq(b) {
    b = Rational.any(b);
    if (this._n.eq(b._n) && this._d.eq(b._d)) { return true; }
    return false;
  }

  /**
   * @method Rational#equal
   * @param {!Rational} b
   * @return {!boolean} this === b.
   */
  equal(b) {
    if (!(b instanceof Rational)) { return false; }
    if (this._n.equal(b._n) && this._d.equal(b._d)) { return true; }
    return false;
  }

  /**
   * @method Rational#cmp
   * @param {!Rational} b
   * @return {!number}
   *      1 (this > b)
   *      0 (this = b)
   *     -1 (this < b).
   */
  cmp(b) {
    return this._n.mul(b._d).cmp(this._d.mul(b._n));
  }

  /**
   * Multiplicative inverse (or reciprocal)
   * @method Rational#inv
   * @return {!Rational}
   */
  inv() {
    const n = this._n;
    const d = this._d;
    if (!n.isNonZero()) {
      throw new Error('zero division');
    }
    if (!n._s) {
      return new Rational(d.neg(), n.neg(), true);
    }
    return new Rational(d, n, true);
  }

  /**
   * @method Rational#add
   * @param {!Rational} b
   * @return {!Rational} this + b.
   */
  add(b) {
    return new Rational(
        this._n.mul(b._d).add(this._d.mul(b._n)),
        this._d.mul(b._d));
  }

  /**
   * @method Rational#sub
   * @param {!Rational} b
   * @return {!Rational} this - b.
   */
  sub(b) {
    return new Rational(
        this._n.mul(b._d).sub(this._d.mul(b._n)),
        this._d.mul(b._d));
  }

  /**
   * @method Rational#mul
   * @param {!Rational} b
   * @return {!Rational} this * b.
   */
  mul(b) {
    return new Rational(this._n.mul(b._n), this._d.mul(b._d));
  }

  /**
   * @method Rational#div
   * @param {!Rational} b
   * @return {!Rational} this / b.
   */
  div(b) {
    return new Rational(this._n.mul(b._d), this._d.mul(b._n));
  }

  /**
   * @method Rational#pow
   * @param {!number} b
   * @return {!Rational} this ^ b.
   */
  pow(b) {
    return new Rational(this._n.pow(b), this._d.pow(b), true);
  }
}
