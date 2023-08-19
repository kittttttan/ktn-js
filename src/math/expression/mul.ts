/**
 * Mul
 */

import {Rational} from '../rational';

/**
 * Mul
 */
export class Mul {
  protected _items: any[];

  constructor(items: any[]) {
    this._items = items;
  }

  public static mul(...items: any[]): Mul {
    return new Mul(items);
  }

  public toString(): string {
    return `mul(${this._items})`;
  }

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

  public clone(): Mul {
    const a: any[] = [];
    for (const item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }

    return new Mul(a);
  }

  public neg(): Mul {
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

    return new Mul(a);
  }

  public inv(): Mul {
    const a: any[] = [];
    for (const item of this._items) {
      const b: any = typeof (item.clone) !== 'undefined' ? item.clone() : item;
      a.push(typeof (b.inv) !== 'undefined' ? b.inv() : Rational.str(`1/${b}`));
    }

    return new Mul(a);
  }
}
