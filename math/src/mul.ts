/**
 * Mul
 */
'use strict';

/**
 * @private
 * @requires Rational
 */
import Rational from '@ktn/rational';

/**
 * Mul
 * @class Mul
 * @property {Array<?>} _items
 */
export default class Mul {
  protected _items: any[];

  /**
   * @param {Array<?>} items
   */
  constructor(items: any[]) {
    this._items = items;
  }

  /**
   * @static
   * @param {...?} items
   * @return {Mul}
   */
  public static mul(...items: any[]): Mul {
    return new Mul(items);
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return `mul(${this._items})`;
  }

  /**
   * @return {Rational}
   */
  public calc(): Rational {
    let v: Rational = Rational.one;
    for (const item of this._items) {
      if (typeof (item.calc) === 'function') {
        v = v.mul(item.calc());
      } else {
        v = v.mul(Rational.str(`${item}`));
      }
    }
    return v;
  }

  /**
   * @retrun {Mul}
   */
  public clone(): Mul {
    const a: any[] = [];
    for (let item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }

    return new Mul(a);
  }

  /**
   * @return {Mul}
   */
  public neg(): Mul {
    const a: any[] = [];
    let isFirst: boolean = true;
    for (let item of this._items) {
      let b: any = typeof (item.clone) !== 'undefined' ? item.clone() : item;
      if (isFirst) {
        isFirst = false;
        a.push(typeof (b.neg) !== 'undefined' ? b.neg() : -b);
      } else {
        a.push(b);
      }
    }

    return new Mul(a);
  }

  /**
   * @return {Mul}
   */
  public inv(): Mul {
    const a: any[] = [];
    for (let item of this._items) {
      let b: any = typeof (item.clone) !== 'undefined' ? item.clone() : item;
      a.push(typeof (b.inv) !== 'undefined' ? b.inv() : Rational.str(`1/${b}`));
    }

    return new Mul(a);
  }
}
