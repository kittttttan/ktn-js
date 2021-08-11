export class BitArray {
  protected static BIT = 5;

  protected _a: Uint32Array;
  protected _l: number;

  constructor(n: number) {
    this._l = n | 0;
    const r = this._l & ((1 << BitArray.BIT) - 1);
    this._a = new Uint32Array((this._l >> BitArray.BIT) + (!r ? 0 : 1));
  }

  /**
   * @param i
   * @return
   */
  public get(i: number): boolean {
    const arrayIndex = i >> BitArray.BIT;
    const bitIndex = i & ((1 << BitArray.BIT) - 1);
    const v = this._a[arrayIndex];
    return ((v >> bitIndex) & 1) === 1;
  }

  /**
   * @param i
   * @param v
   * @return
   */
  public set(i: number, v: boolean) {
    const arrayIndex = i >> BitArray.BIT;
    const bitIndex = i & ((1 << BitArray.BIT) - 1);
    if (v) {
      this._a[arrayIndex] |= (1 << bitIndex);
      return;
    }

    this._a[arrayIndex] &= ~(1 << bitIndex);
  }

  /**
   * @param v
   * @return
   */
   public fill(v: boolean) {
    if (v) {
      const arrayIndex = (this._l - 1) >> BitArray.BIT;
      const bitIndex = (this._l - 1) & ((1 << BitArray.BIT) - 1);
      this._a.fill(0xffffffff);
      this._a[arrayIndex] = (1 << (bitIndex + 1)) - 1;
      return;
    }

    this._a.fill(0);
  }

  /**
   * @param i
   * @return
   */
   public toggle(i: number) {
    const arrayIndex = i >> BitArray.BIT;
    const bitIndex = i & ((1 << BitArray.BIT) - 1);

    this._a[arrayIndex] ^= (1 << bitIndex);
  }

  /**
   * @return
   */
  public toString(): string {
    let s = '';
    const length = 1 << BitArray.BIT;
    const z32 = '0'.repeat(length);
    const lastIndex = this._l - 1;
    for (const [i, a] of this._a.entries()) {
      const slice = (i === lastIndex) ? (this._l & (length - 1)) : -length;
      s = (z32 + a.toString(2)).slice(slice) + s;
    }
    return s;
  }
}
