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
  constructor(items: any[]) {
    this._items = items;
  }

  /**
   * @static
   * @param {...?} items
   * @return {Mul}
   */
  static mul(...items: any[]): Mul {
    return new Mul(items);
  }

  /**
   * @static
   * @param {...?} items
   * @return {Mul}
   */
  static div(...items: any[]): Mul {
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

  toString(): string {
    return `mul(${this._items})`;
  }

  calc(): Rational {
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

  clone(): Mul {
    const a = [];
    for (let item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }
    
    return new Mul(a);
  }

  neg(): Mul {
    const a = [];
    let isFirst: boolean = true;
    for (let item of this._items) {
      let b = typeof (item.clone) !== 'undefined' ? item.clone() : item;
      if (isFirst) {
        isFirst = false;
        a.push(typeof (b.neg) !== 'undefined' ? b.neg() : -b);
      } else {
        a.push(b);
      }
    }

    return new Mul(a);
  }

  inv() {
    // TODO:
  }
}
