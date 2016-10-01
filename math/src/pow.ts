/// <reference path="../node_modules/@ktn/type/typings/rational.d.ts"/>
/**
 * Pow
 */
'use strict';

/**
 * @private
 * @requires Rational
 */
import Rational from '@ktn/rational';

/**
 * Pow
 * @class Pow
 * @property {?} _a
 * @property {?} _p
 */
export default class Pow {
  protected _a: any;
  protected _p: any;

  /**
   * @param {?} a
   * @param {?} p
   */
  constructor(a: any, p: any) {
    this._a = a;
    this._p = p;
  }

  /**
   * @static
   * @param {?} a
   * @param {?} p
   * @return {Pow}
   */
  public static pow(a: any, p: any): Pow {
    return new Pow(a, p);
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return `pow(${this._a},${this._p})`;
  }

  /**
   * @return {?}
   */
  public calc(): any {
    let a: any = this._a;
    let p: any = this._p;

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
