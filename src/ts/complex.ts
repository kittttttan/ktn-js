/**
 * Complex
 * @class Complex
 * @property {!number} Complex#_r
 * @property {!number} Complex#_i
 */
export class Complex {
  _r: number;
  _i: number;

  /**
   * @param {number} r
   * @param {number} i
   */
  constructor(r: number, i: number) {
    this._r = +r;
    this._i = +i;
  }

  /**
   * @return {!number}
   */
  get real(): number {
    return this._r;
  }

  /**
   * @return {!number}
   */
  get imag(): number {
    return this._i;
  }

  /**
   * @return {!string}
   */
  toString(): string {
    return `(${this._r}${(this._i < 0 ? '' : '+')}${this._i}J)`;
  }

  /**
   * @return {!Complex}
   */
  clone(): Complex {
    return new Complex(this._r, this._i);
  }

  /**
   * @param {!number} a
   * @return {!Complex}
   */
  scale(a: number): Complex {
    a = +a;
    return new Complex(this._r * a, this._i * a);
  }

  /**
   * @method Complex#conj
   * @return {!Complex}
   */
  conj(): Complex {
    return new Complex(this._r, -this._i);
  }

  /**
   * @method Complex#add
   * @param {!Complex} a
   * @return {!Complex}
   */
  add(a: Complex): Complex {
    return new Complex(this._r + a._r, this._i + a._i);
  }

  /**
   * @method Complex#sub
   * @param {!Complex} a
   * @return {!Complex}
   */
  sub(a: Complex): Complex {
    return new Complex(this._r - a._r, this._i - a._i);
  }

  /**
   * @method Complex#mul
   * @param {!Complex} a
   * @return {!Complex}
   */
  mul(a: Complex): Complex {
    return new Complex(this._r * a._r - this._i * a._i,
        this._r * a._i + this._i * a._r);
  }
}
