/// <reference path="typings/ktn.d.ts"/>
'use strict';

/**
 * Complex
 * @class Complex
 * @property {!double} Complex#_r
 * @property {!double} Complex#_i
 */
export default class Complex {
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
   * @type {!double}
   */
  get real(): double {
    return this._r;
  }

  set real(real: double) {
    this._r = real;
  }

  /**
   * @type {!double}
   */
  get imag(): double {
    return this._i;
  }

  set imag(imag: double) {
    this._i = imag;
  }

  /**
   * @method Complex#toString
   * @return {!string}
   */
  public toString(): string {
    return `(${this._r}${(this._i < 0 ? '' : '+')}${this._i}J)`;
  }

  /**
   * @method Complex#clone
   * @return {!Complex}
   */
  public clone(): Complex {
    return new Complex(this._r, this._i);
  }

  /**
   * @method Complex#scale
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