/**
 * Pow
 */

 /**
  * @requires Rational
  */
import {Rational} from './rational';

/**
 * Pow
 * @class Pow
 */
export class Pow {
  /**
   * @static
   * @param {?} a
   * @param {?} p
   * @return {Pow}
   */
  static pow(a, p) {
    return new Pow(a, p);
  }

  /**
   * @property {?} _a
   * @property {?} _p
   * @param {?} a
   * @param {?} p
   */
  constructor(a, p) {
    this._a = a;
    this._p = p;
  }

  toString() {
    return `pow(${this._a},${this._p})`;
  }

  calc() {
    let a = this._a;
    let p = this._p;

    if (typeof (a.calc) === 'function') {
      a = a.calc();
    } else {
      a = Rational.str(`${a}`);
    }

    if (typeof (p.calc) === 'function') {
      p = p.calc();
    } else {
      p = parseFloat(p);
    }

    return a.pow(p);
  }
}
