/**
 * Add
 */

 /**
  * @private
  * @requires Rational
  */
import {Rational} from './rational';

/**
 * Add
 * @class Add
 * @property {Array<?>} _items
 */
export class Add {
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
   * @return {Add}
   */
  static add(...items) {
    return new Add(items);
  }
  /**
   * @static
   * @param {...?} items
   * @return {Add}
   */
  static sub(...items) {
    if (items.length === 0) {
      return new Add([]);
    }

    const n = [items[0]];
    for (let i = 1, l = items.length; i < l; ++i) {
      let item = items[i];
      if (typeof (item.neg) === 'function') {
        item = item.neg();
      } else {
        item = Rational.str(`${-item}`);
      }
      n.push(item);
    }

    return new Add(n);
  }

  toString() {
    return `add(${this._items})`;
  }

  calc() {
    let v = Rational.zero;
    for (const item of this._items) {
      if (typeof (item.calc) === 'function') {
        v = v.add(item.calc());
      } else {
        v = v.add(Rational.str(`${item}`));
      }
    }
    return v;
  }
}
