/**
 * Add
 */
'use strict';

import {int} from '@ktn/type';

 /**
  * @private
  * @requires Rational
  */
import {Rational} from '@ktn/rational';

/**
 * Add
 * @class Add
 * @property {Array<?>} _items
 */
export class Add {
  protected _items: any[];

  /**
   * @param {Array<?>} items
   */
  constructor(items: any[]) {
    this._items = items;
  }

  /**
   * @method Add.add
   * @param {...?} items
   * @return {Add}
   */
  public static add(...items: any[]): Add {
    return new Add(items);
  }

  /**
   * @method Add.sub
   * @param {...?} items
   * @return {Add}
   */
  public static sub(...items: any[]): Add {
    const l: int = items.length;
    if (l === 0) {
      return new Add([]);
    }

    const n: any = [items[0]];
    for (let i: int = 1; i < l; ++i) {
      let item: any = items[i];
      if (typeof (item.neg) === 'function') {
        item = item.neg();
      } else {
        item = Rational.str(`${-item}`);
      }
      n.push(item);
    }

    return new Add(n);
  }

  /**
   * @method Add#toString
   * @return {string}
   */
  public toString(): string {
    return `add(${this._items})`;
  }

  /**
   * @method Add#calc
   * @return {Rational}
   */
  public calc(): Rational {
    let v: Rational = Rational.zero;
    for (const item of this._items) {
      if (typeof (item.calc) === 'function') {
        v = v.add(item.calc());
      } else {
        v = v.add(Rational.str(`${item}`));
      }
    }
    return v;
  }

  /**
   * @method Add#clone
   * @return {Add}
   */
  public clone(): Add {
    const a: any[] = [];
    for (let item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }

    return new Add(a);
  }

  /**
   * @method Add#neg
   * @return {Add}
   */
  public neg(): Add {
    const a: any[] = [];
    for (let item of this._items) {
      let b: any = typeof (item.clone) !== 'undefined' ? item.clone() : item;
      a.push(typeof (b.neg) !== 'undefined' ? b.neg() : b);
    }

    return new Add(a);
  }
}
