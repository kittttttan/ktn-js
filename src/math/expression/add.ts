/**
 * Add
 */
import {Rational} from '../rational';

/**
 * Add
 */
export class Add {
  protected _items: any[];

  constructor(items: unknown[]) {
    this._items = items;
  }

  public static add(...items: unknown[]): Add {
    return new Add(items);
  }

  public static sub(...items: unknown[]): Add {
    const l: number = items.length;
    if (l === 0) {
      return new Add([]);
    }

    const n: unknown[] = [items[0]];
    for (let i = 1; i < l; ++i) {
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

  public toString(): string {
    return `add(${this._items})`;
  }

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

  public clone(): Add {
    const a: any[] = [];
    for (const item of this._items) {
      a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
    }

    return new Add(a);
  }

  public neg(): Add {
    const a: unknown[] = [];
    for (const item of this._items) {
      const b: any = typeof (item.clone) !== 'undefined' ? item.clone() : item;
      a.push(typeof (b.neg) !== 'undefined' ? b.neg() : b);
    }

    return new Add(a);
  }
}
