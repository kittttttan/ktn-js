/**
 * Complex
 * @class Complex
 */
function Complex(r, i) {
  this.r_ = +r;
  this.i_ = +i;
}

Complex.prototype = {
//  constructor: Complex,
//  toString: function() {
//    return '(' + this.r_ + '+' + this.i_ +'J)';
//  },
//  clone: function() {
//    return new Complex(this.r_, this.i_);
//  },
//  scale: function(a) {
//    return new Complex(this.r_ * a, this.i_ * a);
//  },
  /**
   * @method Complex#conjugate
   * @return {Complex}
   */
  conj: function() {
    return new Complex(this.r_, -this.i_);
  },
  /**
   * @method Complex#add
   * @param {Complex} a
   * @return {Complex}
   */
  add: function(a) {
    return new Complex(this.r_ + a.r_, this.i_ + a.i_);
  },
  /**
   * @method Complex#sub
   * @param {Complex} a
   * @return {Complex}
   */
  sub: function(a) {
    return new Complex(this.r_ - a.r_, this.i_ - a.i_);
  },
  /**
   * @method Complex#mul
   * @param {Complex} a
   * @return {Complex}
   */
  mul: function(a) {
    return new Complex(this.r_ * a.r_ - this.i_ * a.i_,
        this.r_ * a.i_ + this.i_ * a.r_);
  }
};

// exports
exports.Complex = Complex;
