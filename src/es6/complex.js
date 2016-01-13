/**
 * Complex
 * @class Complex
 */
export class Complex {
  /**
   * @param {number} r
   * @param {number} i
   */
  constructor(r, i) {
    /**
     * @private
     * @property {!number} Complex#r_
     */
    this.r_ = +r;
    /**
     * @private
     * @property {!number} Complex#i_
     */
    this.i_ = +i;
  }

  /**
   * @return {!number}
   */
  get real() {
    return this.r_;
  }

  /**
   * @return {!number}
   */
  get imag() {
    return this.i_;
  }

  /**
   * @return {!string}
   */
  toString() {
    return `(${this.r_}${(this.i_ < 0 ? '' : '+')}${this.i_}J)`;
  }

  /**
   * @return {!Complex}
   */
  clone() {
    return new Complex(this.r_, this.i_);
  }

  /**
   * @param {!number} a
   * @return {!Complex}
   */
  scale(a) {
    a = +a;
    return new Complex(this.r_ * a, this.i_ * a);
  }

  /**
   * @method Complex#conj
   * @return {!Complex}
   */
  conj() {
    return new Complex(this.r_, -this.i_);
  }

  /**
   * @method Complex#add
   * @param {!Complex} a
   * @return {!Complex}
   */
  add(a) {
    return new Complex(this.r_ + a.r_, this.i_ + a.i_);
  }

  /**
   * @method Complex#sub
   * @param {!Complex} a
   * @return {!Complex}
   */
  sub(a) {
    return new Complex(this.r_ - a.r_, this.i_ - a.i_);
  }

  /**
   * @method Complex#mul
   * @param {!Complex} a
   * @return {!Complex}
   */
  mul(a) {
    return new Complex(this.r_ * a.r_ - this.i_ * a.i_,
        this.r_ * a.i_ + this.i_ * a.r_);
  }
}
