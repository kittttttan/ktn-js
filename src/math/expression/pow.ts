/**
 * Pow
 */

import {Rational} from '../rational.ts';
import {isInt} from '../is-int.ts';

/**
 * Pow
 */
export class Pow {
  protected _a: any;
  protected _p: any;

  constructor(a: any, p: any) {
    this._a = a;
    this._p = p;
  }

  public static pow(a: any, p: any): Pow {
    return new Pow(a, p);
  }

  public toString(): string {
    return `pow(${this._a},${this._p})`;
  }

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
