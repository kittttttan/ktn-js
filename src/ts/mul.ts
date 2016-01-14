/**
 * Mul
 */

 /**
  * @private
  * @requires Rational
  */
import {Rational} from './rational';

/**
 * Mul
 * @class Mul
 * @property {Array<?>} _items
 */
export class Mul {
  _items: any[];

  /**
   * @param {Array<?>} items
   */
  constructor(items) {
    this._items = items;
  }

  /**
   * @static
   * @param {...?} items
   * @return {Mul}
   */
  static mul(...items) {
    return new Mul(items);
  }

  /**
   * @static
   * @param {...?} items
   * @return {Mul}
   */
  static div(...items) {
    if (items.length === 0) {
      return new Mul([]);
    }

    const n = [items[0]];
    for (let i = 1, l = items.length; i < l; ++i) {
      let item = items[i];
      if (typeof (item.inv) === 'function') {
        item = item.inv();
      } else {
        item = Rational.str(`1/${item}`);
      }
      n.push(item);
    }

    return new Mul(n);
  }

  toString() {
    return `mul(${this._items})`;
  }

  calc() {
    let v = Rational.one;
    for (const item of this._items) {
      if (typeof (item.calc) === 'function') {
        v = v.mul(item.calc());
      } else {
        v = v.mul(Rational.str(`${item}`));
      }
    }
    return v;
  }
}
