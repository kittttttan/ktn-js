/**
 * Pow
 */
'use strict';

/**
 * @private
 * @requires Rational
 */
import {Rational} from '../rational';
import {isInt} from '../is-int';

/**
 * Pow
 * @class Pow
 * @property {any} _a
 * @property {any} _p
 */
export class Pow {
  protected _a: any;
  protected _p: any;

  /**
   * @param {any} a
   * @param {any} p
   */
  constructor(a: any, p: any) {
    this._a = a;
    this._p = p;
  }

  /**
   * @static
   * @param {any} a
   * @param {any} p
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
   * @return {any}
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
    } else if (isInt(p)) {
      p = BigInt(p);
    } else {
      p = parseFloat(p);
    }

    return a.pow(p);
  }
}
