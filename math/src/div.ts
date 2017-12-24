/**
 * Div
 */
'use strict';

/**
 * @private
 * @requires Rational
 */
import {Rational} from '@ktn/rational';

/**
 * Div
 * @class Div
 * @property {Array<?>} _items
 */
export class Div {
  protected _items: any[];

  /**
   * @param {Array<?>} items
   */
  constructor(items: any[]) {
    this._items = items;
  }

  /**
   * @method Div.div
   * @param {...?} items
   * @return {Div}
   */
  public static div(...items: any[]): Div {
    return new Div(items);
  }

  /**
   * @method Div#toString
   * @return {string}
   */
  public toString(): string {
    return `div(${this._items})`;
  }

  /**
   * @method Div#calc
   * @return {Rational}
   */
  public calc(): Rational {
    let v: Rational = Rational.one;
    let isFirst: boolean = true;
    for (const item of this._items) {
      if (isFirst) {
        isFirst = false;
        v = (typeof (item.calc) === 'function') ? item.calc() : Rational.str(`${item}`);
        continue;
      }
      if (typeof (item.calc) === 'function') {
        v = v.div(item.calc());
      } else {
        v = v.div(Rational.str(`${item}`));
      }
    }
    return v;
  }

  /**
   * @method Div#clone
   * @returtn {Div}
   */
  public clone(): Div {
    const a: any[] = [];
    for (let item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }

    return new Div(a);
  }

  /**
   * @method Div#neg
   * @return {Div}
   */
  public neg(): Div {
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

    return new Div(a);
  }
}
