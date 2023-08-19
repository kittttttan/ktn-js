/**
 * Div
 */

import {Rational} from '../rational';

/**
 * Div
 */
export class Div {
  protected _items: any[];

  constructor(items: any[]) {
    this._items = items;
  }

  public static div(...items: any[]): Div {
    return new Div(items);
  }

  public toString(): string {
    return `div(${this._items})`;
  }

  public calc(): Rational {
    let v: Rational = Rational.one;
    let isFirst = true;
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

  public clone(): Div {
    const a: any[] = [];
    for (const item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }

    return new Div(a);
  }

  public neg(): Div {
    const a: any[] = [];
    let isFirst = true;
    for (const item of this._items) {
      const b: any = typeof (item.clone) !== 'undefined' ? item.clone() : item;
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
