/**
 * Pow
 */
'use strict';

 /**
  * @private
  * @requires Rational
  */
import {Rational} from './rational';

/**
 * Pow
 * @class Pow
 * @property {?} _a
 * @property {?} _p
 */
export class Pow {
  protected _a;
  protected _p;

  /**
   * @param {?} a
   * @param {?} p
   */
  constructor(a, p) {
    this._a = a;
    this._p = p;
  }

  /**
   * @static
   * @param {?} a
   * @param {?} p
   * @return {Pow}
   */
  public static pow(a, p): Pow {
    return new Pow(a, p);
  }

  public toString(): string {
    return `pow(${this._a},${this._p})`;
  }

  public calc() {
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
