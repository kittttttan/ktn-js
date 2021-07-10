/**
 * Complex
 * @class Complex
 * @property {number} Complex#_r
 * @property {number} Complex#_i
 */
export class Complex {
  protected _r: number;
  protected _i: number;

  /**
   * @param {number} r
   * @param {number} i
   */
  constructor(r = 0, i = 0) {
    this._r = +r;
    this._i = +i;
  }

  /**
   * 0
   * @static
   * @mrthod Complex.zero
   * @return {Complex}
   */
  static get zero(): Complex {
    return new Complex();
  }

  /**
   * 1
   * @static
   * @mrthod Complex.one
   * @return {Complex}
   */
  static get one(): Complex {
    return new Complex(1);
  }

  /**
   * @type {number}
   */
  get real(): number {
    return this._r;
  }

  set real(real: number) {
    this._r = real;
  }

  /**
   * @type {number}
   */
  get imag(): number {
    return this._i;
  }

  set imag(imag: number) {
    this._i = imag;
  }

  /**
   * @method Complex#toString
   * @return {string}
   */
  public toString(): string {
    return `(${this._r}${(this._i < 0 ? '' : '+')}${this._i}J)`;
  }

  /**
   * @method Complex#clone
   * @return {Complex}
   */
  public clone(): Complex {
    return new Complex(this._r, this._i);
  }

  /**
   * @method Complex#scale
   * @param {number} a
   * @return {Complex}
   */
  public scale(a: number): Complex {
    a = +a;
    return new Complex(this._r * a, this._i * a);
  }

  /**
   * @method Complex#conj
   * @return {Complex}
   */
  public conj(): Complex {
    return new Complex(this._r, -this._i);
  }

  /**
   * @method Complex#add
   * @param {Complex} a
   * @return {Complex}
   */
  public add(a: Complex): Complex {
    return new Complex(this._r + a._r, this._i + a._i);
  }

  /**
   * @method Complex#sub
   * @param {Complex} a
   * @return {Complex}
   */
  public sub(a: Complex): Complex {
    return new Complex(this._r - a._r, this._i - a._i);
  }

  /**
   * @method Complex#mul
   * @param {Complex} a
   * @return {Complex}
   */
  public mul(a: Complex): Complex {
    return new Complex(
        this._r * a._r - this._i * a._i,
        this._r * a._i + this._i * a._r);
  }

  /**
   * @method Complex#eq
   * @param {unknown} a
   * @return {boolean}
   */
  public eq(a: unknown): boolean {
    if (typeof(a) === 'number') {
      return this.equal(new Complex(+a));
    }

    return this.equal(a);
  }

  /**
   * @method Complex#equal
   * @param {unknown} a
   * @return {boolean}
   */
  public equal(a: unknown): boolean {
    if (this === a) { return true; }
    if (!(a instanceof Complex)) { return false; }
    return this._r === a._r && this._i === a._i;
  }

}
