import type {uint} from '../types';

/**
 * @example
 * const ba = new BitArray(8); // 00000000
 * 
 * ba.set(0, true); // 00000001
 * ba.get(0); // true
 * 
 * ba.toggle(0); // 00000000
 * ba.get(0); // false
 * 
 * ba.fill(true); // 11111111
 */
export class BitArray {
  /**
   * 1 << 5 == 32
   */
  protected static readonly BIT = 5;

  protected readonly _a: Uint32Array;
  protected readonly _l: uint;

  constructor(n: uint) {
    if (n < 0) {
      throw new RangeError();
    }
    this._l = n | 0;
    const mod = this._l & ((1 << BitArray.BIT) - 1);
    this._a = new Uint32Array((this._l >> BitArray.BIT) + (mod ? 1 : 0));
  }

  public get(i: uint): boolean {
    if (i >= this._l) {
      throw new RangeError();
    }
    const bitIndex = i & ((1 << BitArray.BIT) - 1);
    const arrayIndex = (i >> BitArray.BIT);
    const v = this._a[arrayIndex];
    return ((v >> bitIndex) & 1) === 1;
  }

  public set(i: uint, v: boolean): void {
    if (i >= this._l) {
      throw new RangeError();
    }
    const bitIndex = i & ((1 << BitArray.BIT) - 1);
    const arrayIndex = (i >> BitArray.BIT);
    if (v) {
      this._a[arrayIndex] |= (1 << bitIndex);
      return;
    }

    this._a[arrayIndex] &= ~(1 << bitIndex);
  }

   public fill(v: boolean): void {
    if (v) {
      this._a.fill(0xffffffff);
      return;
    }

    this._a.fill(0);
  }

  public reverse(): void {
    for (let i = 0, l = this._a.length; i < l; i++) {
      this._a[i] = ~this._a[i];
    }
  }

   public toggle(i: uint): void {
    if (i >= this._l) {
      throw new RangeError();
    }
    const bitIndex = i & ((1 << BitArray.BIT) - 1);
    const arrayIndex = (i >> BitArray.BIT);

    this._a[arrayIndex] ^= (1 << bitIndex);
  }

  public toString(): string {
    let s = '';
    if (!this._l) {
      return s;
    }
    const length = 1 << BitArray.BIT;
    const z = '0'.repeat(length);
    for (const a of this._a) {
      s = (z + a.toString(2)).slice(-length) + s;
    }
    return s.slice(-this._l);
  }
}
