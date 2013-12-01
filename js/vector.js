var _sqrt = Math.sqrt;

/**
 * Vector
 *
 * @class Vector
 */
function Vector(x, y, z) {
  this.x = +x;
  this.y = +y;
  this.z = +z;
}

Vector.prototype = {
  /**
   * @const
   * @property Vector#constructor
   * @type Vector
   */
  constructor: Vector,

  /**
   * @method Vector#toString
   * @return {string}
   */
  toString: function() {
    return '('+ this.x +','+ this.y +','+ this.z +')';
  },

  /**
   * @method Vector#clone
   * @return {Vector}
   */
  clone: function() {
    var v = new Vector(this.x, this.y, this.z);
    return v;
  },

  /**
   * @method Vector#norm
   * @return {number}
   */  
  norm: function() {
    return _sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },

  /**
   * @method Vector#add
   * @param {Vector} v
   * @return {Vector}
   */
  add: function(v) {
    var w = new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    return w;
  },

  /**
   * @method Vector#sub
   * @param {Vector} v
   * @return {Vector}
   */
  sub: function(v) {
    var w = new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    return w;
  },

  /**
   * @method Vector#mul
   * @param {number} n
   * @return {number}
   */
  mul: function(n) {
    var v = new Vector(n * this.x, n * this.y, n * this.z);
    return v;
  },

  /**
   * @method Vector#cross
   * @param {Vector} v
   * @return {Matrix}
   */
  //cross: function(n) {
  //  var m = new Matrix(this.x, this.y, this.z);
  //  return m;
  //},

  /**
   * @method Vector#dot
   * @param {Vector} v
   * @return {number}
   */
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
};

// exports
exports.Vector = Vector;
