'use strict';

/**
 * Complex
 * @class Complex
 * @property {!double} Complex#_r
 * @property {!double} Complex#_i
 */
export class Complex {
  protected _r: double;
  protected _i: double;

  /**
   * @param {double} r
   * @param {double} i
   */
  constructor(r: double, i: double) {
    this._r = +r;
    this._i = +i;
  }

  /**
   * @return {!double}
   */
  get real(): double {
    return this._r;
  }

  /**
   * @param {double} real
   */
  set real(real: double) {
    this._r = real;
  }

  /**
   * @return {!double}
   */
  get imag(): double {
    return this._i;
  }

  /**
   * @param {double} imag
   */
  set imag(imag: double) {
    this._i = imag;
  }

  /**
   * @return {!string}
   */
  public toString(): string {
    return `(${this._r}${(this._i < 0 ? '' : '+')}${this._i}J)`;
  }

  /**
   * @return {!Complex}
   */
  public clone(): Complex {
    return new Complex(this._r, this._i);
  }

  /**
   * @param {!double} a
   * @return {!Complex}
   */
  public scale(a: double): Complex {
    a = +a;
    return new Complex(this._r * a, this._i * a);
  }

  /**
   * @method Complex#conj
   * @return {!Complex}
   */
  public conj(): Complex {
    return new Complex(this._r, -this._i);
  }

  /**
   * @method Complex#add
   * @param {!Complex} a
   * @return {!Complex}
   */
  public add(a: Complex): Complex {
    return new Complex(this._r + a._r, this._i + a._i);
  }

  /**
   * @method Complex#sub
   * @param {!Complex} a
   * @return {!Complex}
   */
  public sub(a: Complex): Complex {
    return new Complex(this._r - a._r, this._i - a._i);
  }

  /**
   * @method Complex#mul
   * @param {!Complex} a
   * @return {!Complex}
   */
  public mul(a: Complex): Complex {
    return new Complex(
        this._r * a._r - this._i * a._i,
        this._r * a._i + this._i * a._r);
  }
}
