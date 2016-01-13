/**
 * Complex
 * @class Complex
 */
export class Complex {
  /**
   * @private
   * @property {!number} Complex#r_
   */
  r_: number;

  /**
   * @private
   * @property {!number} Complex#i_
   */
  i_: number;

  /**
   * @param {number} r
   * @param {number} i
   */
  constructor(r: number, i: number) {
    this.r_ = +r;
    this.i_ = +i;
  }

  /**
   * @return {!number}
   */
  get real(): number {
    return this.r_;
  }

  /**
   * @return {!number}
   */
  get imag(): number {
    return this.i_;
  }

  /**
   * @return {!string}
   */
  toString(): string {
    return `(${this.r_}${(this.i_ < 0 ? '' : '+')}${this.i_}J)`;
  }

  /**
   * @return {!Complex}
   */
  clone(): Complex {
    return new Complex(this.r_, this.i_);
  }

  /**
   * @param {!number} a
   * @return {!Complex}
   */
  scale(a: number): Complex {
    a = +a;
    return new Complex(this.r_ * a, this.i_ * a);
  }

  /**
   * @method Complex#conj
   * @return {!Complex}
   */
  conj(): Complex {
    return new Complex(this.r_, -this.i_);
  }

  /**
   * @method Complex#add
   * @param {!Complex} a
   * @return {!Complex}
   */
  add(a): Complex {
    return new Complex(this.r_ + a.r_, this.i_ + a.i_);
  }

  /**
   * @method Complex#sub
   * @param {!Complex} a
   * @return {!Complex}
   */
  sub(a): Complex {
    return new Complex(this.r_ - a.r_, this.i_ - a.i_);
  }

  /**
   * @method Complex#mul
   * @param {!Complex} a
   * @return {!Complex}
   */
  mul(a): Complex {
    return new Complex(this.r_ * a.r_ - this.i_ * a.i_,
        this.r_ * a.i_ + this.i_ * a.r_);
  }
}
