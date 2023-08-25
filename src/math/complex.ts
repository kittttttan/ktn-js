import type {float} from '../types';

/**
 * Complex
 */
export class Complex {
  protected _r: float;
  protected _i: float;

  constructor(r = 0, i = 0) {
    this._r = +r;
    this._i = +i;
  }

  /**
   * 0
   */
  static get zero(): Complex {
    return new Complex();
  }

  /**
   * 1
   */
  static get one(): Complex {
    return new Complex(1);
  }

  get real(): float {
    return this._r;
  }

  set real(real: float) {
    this._r = real;
  }

  get imag(): float {
    return this._i;
  }

  set imag(imag: float) {
    this._i = imag;
  }

  public toString(): string {
    return `(${this._r}${(this._i < 0 ? '' : '+')}${this._i}J)`;
  }

  public clone(): Complex {
    return new Complex(this._r, this._i);
  }

  public scale(a: float): Complex {
    a = +a;
    return new Complex(this._r * a, this._i * a);
  }

  public conj(): Complex {
    return new Complex(this._r, -this._i);
  }

  public add(a: Complex): Complex {
    return new Complex(this._r + a._r, this._i + a._i);
  }

  public sub(a: Complex): Complex {
    return new Complex(this._r - a._r, this._i - a._i);
  }

  public mul(a: Complex): Complex {
    return new Complex(
        this._r * a._r - this._i * a._i,
        this._r * a._i + this._i * a._r);
  }

  public eq(a: unknown): boolean {
    if (typeof(a) === 'number') {
      return this.equal(new Complex(+a));
    }

    return this.equal(a);
  }

  public equal(a: unknown): boolean {
    if (this === a) { return true; }
    if (!(a instanceof Complex)) { return false; }
    return this._r === a._r && this._i === a._i;
  }
}
