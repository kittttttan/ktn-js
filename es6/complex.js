'use strict';

/**
 * Complex
 * @class Complex
 */
//export default
class Complex {
  constructor(r, i) {
    this.r_ = +r;
    this.i_ = +i;
  }

  get real() {
    return this.r_;
  }

  get imag() {
    return this.i_;
  }

  toString() {
    return '(' + this.r_ + (this.i_ < 0 ? '':'+') + this.i_ +'J)';
  }

  clone() {
    return new Complex(this.r_, this.i_);
  }

  scale(a) {
    a = +a;
    return new Complex(this.r_ * a, this.i_ * a);
  }

  /**
   * @method Complex#conjugate
   * @return {Complex}
   */
  conj() {
    return new Complex(this.r_, -this.i_);
  }

  /**
   * @method Complex#add
   * @param {Complex} a
   * @return {Complex}
   */
  add(a) {
    return new Complex(this.r_ + a.r_, this.i_ + a.i_);
  }

  /**
   * @method Complex#sub
   * @param {Complex} a
   * @return {Complex}
   */
  sub(a) {
    return new Complex(this.r_ - a.r_, this.i_ - a.i_);
  }

  /**
   * @method Complex#mul
   * @param {Complex} a
   * @return {Complex}
   */
  mul(a) {
    return new Complex(this.r_ * a.r_ - this.i_ * a.i_,
        this.r_ * a.i_ + this.i_ * a.r_);
  }
}

module.exports = {
  Complex: Complex
};
