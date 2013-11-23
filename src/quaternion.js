(function(exports){
'use strict';

var _sqrt = Math.sqrt;
var _cos = Math.cos;
var _sin = Math.sin;
var PI = Math.PI;

/**
 * Quaternion
 *
 * @class Quaternion
 */
function Quaternion(w, x, y, z) {
  this.w = +w;
  this.x = +x;
  this.y = +y;
  this.z = +z;
}

/**
 * @static
 * @method Quaternion.create
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {Quaternion}
 */
Quaternion.create = function(x, y, z) {
  return new Quaternion(0, +x, +y, +z);
};

Quaternion.prototype = {
  /**
   * @const
   * @property Quaternion#constructor
   * @type Quaternion
   */
  constructor: Quaternion,

  /**
   * @method Quaternion#toString
   * @return {string}
   */
  toString: function() {
    return '('+ this.w +';'+ this.x +','+ this.y +','+ this.z +')';
  },

  /**
   * @method Quaternion#clone
   * @return {Quaternion}
   */
  clone: function() {
    var q = new Quaternion(this.w, this.x, this.y, this.z);
    return q;
  },
  
  /**
   * @method Quaternion#conjugate
   * @return {Quaternion}
   */
  conjugate: function() {
    var q = new Quaternion(this.w, -this.x, -this.y, -this.z);
    return q;
  },

  /**
   * @method Quaternion#mul
   * @param {Quaternion} q
   * @return {Quaternion}
   */
  mul: function(q) {
    var r = new Quaternion(
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w);
    return r;
  },
    
  /**
   * @method Quaternion#rotate
   * @param {number} r
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Quaternion}
   */
  rotate: function(r, x, y, z) {
    var n = _sqrt(x * x + y * y + z * z);
    if (!n) {
      throw new Error('Invalid arguments: '+ arguments);
    }
    
    x /= n;
    y /= n;
    z /= n;
    
    var ph = r / 2;
    var cos = _cos(ph);
    var sin = _sin(ph);
    var rq = new Quaternion(cos, x * sin, y * sin, z * sin);
    var qq = new Quaternion(cos, -x * sin, -y * sin, -z * sin);
    
    return rq.mul(this).mul(qq);
  },
  
  /**
   * @method Quaternion#norm
   * @return {number}
   */
  norm: function() {
    var n = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    return _sqrt(n);
  },
  
  /**
   * @method Quaternion#normalize
   * @return {Quaternion}
   */
  normalize: function() {
    var norm = this.norm();
    if (!norm) { return undefined; }
    return new Quaternion(this.w / norm,
        this.x / norm, this.y / norm, this.z / norm);
  },
  
  /**
   * @method Quaternion#inverse
   * @return {Quaternion}
   */
  inverse: function() {
    var norm = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    if (!norm) { return undefined; }
    
    var q = new Quaternion(this.w / norm,
        this.x / norm, this.y / norm, this.z / norm);
    return q;
  }
};

// exports
exports.Quaternion = Quaternion;

}(typeof exports !== 'undefined' ? exports : this));