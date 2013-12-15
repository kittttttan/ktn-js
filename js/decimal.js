/**
 * @fileOverview Decimal in JavaScript.
 * @example
 *    var Decimal = require('/path/to/decimal.js').Decimal;
 *    var a = Decimal.num(7, -3);
 *    var b = Decimal.str('100.1');
 *    var c = a.mul(b);
 *    a.toString();  // '0.007'
 *    b.toString();  // '100.1'
 *    c.toString();  // '0.7007'
 * @author kittttttan
 */

var Integer = require('./integer.js').Integer;

/**
 * Decimal
 * @class Decimal
 * @param {Integer} l
 * @param {number} e
 */
function Decimal(l, e) {
  e = e | 0;

  /**
   * @private
   * @property {Integer} Decimal#_l
   */
  this._l = l;

  /**
   * @private
   * @property {number} Decimal#_e
   */
  this._e = e;
}

// static method
/**
 * Convert String to Decimal.
 * @static
 * @method Decimal.str
 * @param {string} n
 * @return {Decimal}
 */
var decStr = function(str) {
  var index = str.indexOf('.');
  if (index < 0) {
    // '.' is not found
    return new Decimal(Integer.str(str), 0);
  }
  var trim = str.substring(0, index) + str.substring(index + 1);
  var i = 0;
  while (trim.charAt(i) === '0') { ++i; }
  if (i) { trim = trim.substring(i); }
  return new Decimal(Integer.str(trim), index - str.length + 1);
};

Object.defineProperty(Decimal, 'str', {
  value: decStr
});

/**
 * Convert Number to Decimal.
 * @static
 * @method Decimal.num
 * @param {number} a
 * @param {number} b
 * @return {Decimal}
 */
var decNum = function(a, b) {
  return new Decimal(Integer.num(a), b);
};

Object.defineProperty(Decimal, 'num', {
  value: decNum
});

/**
 * Convert anything to Decimal.
 * @static
 * @method Decimal.dec
 * @param {object} l
 * @param {object} e
 * @return {Decimal}
 */
var decimal = function(l, e) {
  if (!arguments.length) {
    return new Decimal(new Integer(), 0);
  }
  if (arguments.length === 1) {
    if (l instanceof Decimal) { return l.clone(); }
    if (typeof l === 'string') { return decStr(l); }
    return new Decimal(Integer.any(l), 0);
  }
  return new Decimal(Integer.any(l), e | 0);
};

Object.defineProperty(Decimal, 'dec', {
  value: decimal
});

/**
 * Convert Fraction to Decimal.
 * @static
 * @method Decimal.rat
 * @param {Rational} a
 * @param {number} b
 * @return {Decimal}
 */
Decimal.rat = function(a, b) {
  return new Decimal(a._n, 0).div(new Decimal(a._d, 0), b);
};

/**
 * 1
 * @static
 * @method Decimal.one
 * @return {Decimal} 1.
 */
Object.defineProperty(Decimal, 'one', {
  get: function() { return decNum(1, 0); }
});

/**
 * 0
 * @static
 * @method Decimal.zero
 * @return {Decimal} 0.
 */
Object.defineProperty(Decimal, 'zero', {
  get: function() { return decNum(0, 0); }
});

Decimal.prototype = {
  /**
   * @const
   * @property Decimal#constructor
   * @type Decimal
   */
  constructor: Decimal,

  /**
   * Copy Decimal.
   * @method Decimal#clone
   * @return {Decimal}
   */
  clone: function() {
    return new Decimal(this._l.clone(), this._e);
  },

  /**
   * @method Decimal#toString
   * @return {string}
   */
  toString: function() {
    if (this._e >= 0) {
      return this._l.addZero(this._e).toString();
    }

    var sign = this._l._s;
    var str = this._l.toString();
    var n = -this._e - str.length;
    if (!sign) { n = n + 1; }

    if (n < 0) {
      return str.slice(0, this._e) + '.' + str.slice(this._e);
    }

    var zeros = '';
    for (var z = '0'; n > 0; n >>>= 1, z += z) {
      if (n & 1) { zeros += z; }
    }
    if (!sign) {
      return '-0.' + zeros + str.substring(1);
    }
    return '0.' + zeros + str;
  },

  /**
   * @method Decimal#html
   * @return {string}
   */
  html: function() {
    return this._l.toString() + '&times;10<sup>' + this._e + '</sup>';
  },

  /**
   * @method Decimal#tex
   * @return {string}
   */
  tex: function() {
    return this._l.toString() + '\times 10^' + this._e;
  },

  /**
   * @method Decimal#valueOf
   * @return {number}
   */
  valueOf: function() {
    return this._l.valueOf() * Math.pow(10, this._e);
  },

  /**
   * @method Decimal#dot
   * @return {number}
   */
  dot: function() {
    var e = this._e < 0 ? -this._e : 0;
    return this._l.toString().length - e;
  },

  /**
   * @method Decimal#floor
   * @return {Integer}
   */
  floor: function() {
    return Integer.str(this._l.toString().substring(0, this.dot()));
  },

  /**
   * @method Decimal#setLen
   * @return {Decimal}
   */
  setLen: function(n) {
    var a = this.clone(),
        str = a._l.toString(),
        diff = n - str.length;
    if (diff < 0) {
      a._l = Integer.str(str.substring(0, n));
      a._e -= diff;
    } else {
      var zeros = '';
      for (var z = '0'; diff > 0; diff >>>= 1, z += z) {
        if (diff & 1) { zeros += z; }
      }
      a._l = Integer.str(str + zeros);
    }
    return a;
  },

  /**
   * @method Decimal#abs
   * @return {Decimal}
   */
  abs: function() {
    var a = this.clone();
    a._l._s = true;
    return a;
  },

  /**
   * @method Decimal#neg
   * @return {Decimal}
   */
  neg: function() {
    var a = this.clone();
    a._l._s = !a._l._s;
    return a;
  },

  /**
   * @method Decimal#trim
   * @return {Decimal}
   */
  trim: function() {
    var a = this.clone(),
        str = a._l.toString(),
        i = str.length - 1;
    while (i >= 0 && str.charAt(i) === '0') {
      ++a._e;
      --i;
    }
    str = str.substring(0, i + 1);
    a._l = Integer.str(str);
    return a;
  },

  /**
   * @method Decimal#add
   * @param {Decimal} b
   * @return {Decimal}
   */
  add: function(b) {
    var diff = this._e - b._e;
    if (diff > 0) {
      return new Decimal(this._l.addZero(diff).add(b._l), b._e);
    }
    if (diff < 0) {
      return new Decimal(this._l.add(b._l.addZero(-diff)), this._e);
    }
    return new Decimal(this._l.add(b.l), this._e);
  },

  /**
   * @method Decimal#sub
   * @param {Decimal} b
   * @return {Decimal}
   */
  sub: function(b) {
    var diff = this._e - b._e;
    if (diff > 0) {
      return new Decimal(this._l.addZero(diff).sub(b._l), b._e);
    }
    if (diff < 0) {
      return new Decimal(this._l.sub(b._l.addZero(-diff)), this._e);
    }
    return new Decimal(this._l.sub(b._l), this._e);
  },

  /**
   * @method Decimal#mul
   * @param {Decimal} b
   * @return {Decimal}
   */
  mul: function(b) {
    var diff = this._e + b._e;
    return new Decimal(this._l.mul(b._l), diff);
  },

  /**
   * @method Decimal#div
   * @param {Decimal} b
   * @param {number} c
   * @return {Decimal}
   */
  div: function(b, c) {
    c = c || 20;
    var diff = this._l.toString().length - b._l.toString().length,
        e = this._e - b._e,
        f = b._e;
    if (diff < 0) {
      return new Decimal(this._l.addZero(c - diff + 1 - f).div(b._l),
                                 -c + diff - 1 + e + f).trim();
    }
    return new Decimal(this._l.addZero(c - f).div(b._l), -c + e + f).trim();
  }
};

exports.Decimal = Decimal;
