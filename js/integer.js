/**
 * @fileOverview Big Integer in JavaScript.
 * @example
 *   var Integer = require('/path/to/integer.js').Integer;
 *   var a = Integer.str('12345678909876543210');
 *   var b = Integer.num(7777777);
 *   var c = a.mul(b); // a * b
 *   c.toString();     // '96021937474622850618244170'
 * @author kittttttan
 */

/**
 * cache
 * @type function
 */
var _random = Math.random;

/**
 * Integer
 * @class Integer
 */
function Integer() {
  /**
   * Digits [d0, d1, ..., dn]
   * @private
   * @property {number[]} Integer#_d
   */
  this._d = new Uint32Array(3);

  /**
   * Sign +, -. `false` means -.
   * @private
   * @property {boolean} Integer#_s
   */
  this._s = true;

  /**
   * Length of digits
   * @private
   * @property {number} Integer#_l
   */
  this._l = 1;
}

/**
 * @private
 * @const
 * @type number
 */
var SHIFT = 16;

/**
 * @private
 * @const
 * @type number
 */
var BASE = 1 << SHIFT;

/**
 * @private
 * @const
 * @type number
 */
var MASK = BASE - 1;

/**
 * 1
 * @static
 * @method Integer.one
 * @return {Integer} 1.
 */
Object.defineProperty(Integer, 'one', {
  get: function() { return longNum(1); }
});

/**
 * 0
 * @static
 * @method Integer.zero
 * @return {Integer} 0.
 */
Object.defineProperty(Integer, 'zero', {
  get: function() { return new Integer(); }
});

/**
 * Converts integer to Integer.
 * @static
 * @method Integer.num
 * @param {number} n -0x7fffffff <= n <= 0x7fffffff
 * @return {Integer}
 * @example
 *   Integer.num(0);       // 0
 *   Integer.num(1234567); // 1234567
 *   Integer.num(-37);     // -37
 */
var longNum = function(n) {
  n = n | 0;

  var a = new Integer();
  if (!n) { return a; }

  if (n < 0) {
    n = -n;
    a._s = false;
  }

  a._d[0] = n & MASK;

  n = n >>> SHIFT;
  if (n) {
    a._d[1] = n & MASK;
    a._l = 2;
  }

  return a;
};

Object.defineProperty(Integer, 'num', {
  value: longNum
});


/**
 * Converts digit string to Integer.
 * @static
 * @method Integer.str
 * @param {string} str For example '-9' or 'FF' etc.
 * @param {number} [base=10] 2, 8, 10 or 16
 * @return {Integer}
 * @example
 *   Integer.str('77');     // 77
 *   Integer.str('ff', 16); // 255
 *   Integer.str('111', 2); // 7
 */
var longStr = function(str, base) {
  base = base | 0;
  if (!base) { base = 10; }

  var index = 0;
  var sign = true;
  if (str.charAt(index) === '+') {
    index = index + 1;
  } else if (str.charAt(index) === '-') {
    sign = false;
    index = index + 1;
  }

  // Ignore following zeros. '00102' is regarded as '102'.
  while (str.charAt(index) === '0') { index = index + 1; }
  if (!str.charAt(index)) { return new Integer(); }

  var len = 0;
  if (base === 8) {
    len = 3 * (str.length + 1 - index);
  } else {
    if (!str.charAt(index)) { index = index - 1; }
    len = (str.length + 1 - index) << 2;
  }
  len = (len >>> 4) + 1;

  var z = longAlloc(len, sign);
  longFillZero(z, len);

  var zd = z._d;
  var bl = 1;
  var c = '';
  var n = 0;
  var i = 0;
  for (;;) {
    c = str.charAt(index);
    index = index + 1;
    if (!c) { break; }

    n = parseInt(c, base);
    for (i = 0;;) {
      for (; i < bl; i = i + 1) {
        n = n + zd[i] * base;
        zd[i] = n & MASK;
        n = n >>> SHIFT;
      }

      if (!n) { break; }

      bl = bl + 1;
    }
  }

  return norm(z);
};

Object.defineProperty(Integer, 'str', {
  value: longStr
});

/**
 * Converts exponential string to Integer.
 * @static
 * @method Integer.exp
 * @param {String} a
 * @return {Integer}
 * @example
 *   Integer.exp("7");      // 7
 *   Integer.exp("7e3");    // 7000
 *   Integer.exp("314e-2"); // 3
 */
var longExp = function(a) {
  var i = a.indexOf('e', 0);
  if (i < 0) {
    // 'e' is not found
    return longStr(a);
  }

  var s = a.substr(0, i);
  var e = parseInt(a.substr(i + 1, a.length - (i + 1)), 10);
  var fpt = s.indexOf('.', 0);

  if (fpt >= 0) {
    // '.' is found
    var np = s.length - (fpt + 1);
    s = s.substr(0, fpt) + s.substr(fpt + 1, np);
    e = e - np;
  }

  if (e < 0) {
    s = s.slice(0, e);
  } else {
    for (; e > 0; e = e - 1) { s = s + '0'; }
  }

  return longStr(s);
};

Object.defineProperty(Integer, 'exp', {
  value: longExp
});

/**
 * Converts anything to Integer.
 * @static
 * @method Integer.any
 * @param {Object} a
 * @return {Integer}
 * @example
 *   Integer.any(0);         // 0
 *   Integer.any(1234567);   // 1234567
 *   Integer.any(-12.34567); // -12
 *   Integer.any("37");      // 37
 */
var any = function(a) {
  if (typeof a === 'object') {
    if (a instanceof Integer) { return a.clone(); }
    return new Integer();
  }

  if (typeof a === 'number') {
    if (-0x7fffffff <= a && a <= 0x7fffffff) {
      return longNum(a);
    }

    a = a + '';
  }

  if (typeof a === 'string') {
    return longExp(a);
  }

  return new Integer();
};

Object.defineProperty(Integer, 'any', {
  value: any
});

/**
 * Random.
 * @static
 * @method Integer.random
 * @param {number} a Length.
 * @return {Integer}
 */
Integer.random = function(a) {
  a = a | 0;
  var r = longAlloc(a, true);
  var rd = r._d;

  for (var i = 0; i < a; i = i + 1) {
    rd[i] = _random() * BASE | 0;
  }

  return norm(r);
};

/**
 * @private
 * @param {number} n
 * @return {Integer}
 */
function factOdd(n) {
  n = n | 0;

  var m = Integer.one;
  var mi = 0;
  var mj = 0;
  var i = 0;
  var j = 0;
  var l = 0;
  var limit = 1 << ((SHIFT - 1) << 1);

  for (;; i = i + 1 | 0) {
    l = (n / (1 << i)) | 0;
    if (l < 3) { break; }

    mi = 1;
    mj = 1;
    for (j = 3; (j | 0) <= (l | 0); j = j + 2 | 0) {
      mi = mi * j;
      if (mi > limit) {
        m = m.mul(Integer.num(mj));
        mi = mj = j;
      } else {
        mj = mi;
      }
    }

    if ((mj | 0) > 1) { m = m.mul(Integer.num(mj)); }
  }

  return m;
}

/**
 * @private
 * @param {number} n
 * @return {Integer}
 */
function factEven(n) {
  n = n | 0;

  var s = 0;
  while (n) {
    n = n >>> 1;
    s = s + n;
  }

  return Integer.one.leftShift(s);
}

/**
 * @static
 * @method Integer.factorial
 * @param {number} n
 * @return {Integer}
 * @example
 *   Integer.factorial(3); // 1*2*3 = 6
 */
Integer.factorial = function(n) {
  n = n | 0;
  if (n < 1) { return Integer.one; }
  return factOdd(n).mul(factEven(n));
};

/**
 * Set length.
 * @private
 * @param {number} length
 * @param {boolean} sign
 */
function longAlloc(length, sign) {
  length = length | 0;

  var a = new Integer();
  a._s = sign ? true : false;
  a._l = length;
  a._d = new Uint32Array(length);

  return a;
}

/**
 * Assign zero to initialize.
 * @private
 * @param {Integer} a
 * @param {number} b Length.
 * @return {Integer}
 */
function longFillZero(a, b) {
  b = b | 0;
  var d = a._d;
  while (b--) { d[b] = 0; }

  return a;
}

/**
 * Delete following zeros. [2, 0, 1, 0, 0] -> [2, 0, 1]
 * @private
 * @param {Integer} a
 * @return {Integer}
 */
function norm(a) {
  var d = a._d;
  var l = a._l | 0;

  do { l = l - 1 | 0; } while (l && !d[l]);
  a._l = l + 1 | 0;

  // -0 -> +0
  if (!l && !d[l]) { a._s = true; }

  return a;
}

/**
 * Right shift by 1.
 * @private
 * @param {Integer} a
 * @return {Integer} a >> 1
 */
function longHalf(a) {
  var d = a._d;
  var l = a._l - 1;

  for (var i = 0; i < l; i = i + 1) {
    d[i] = (((d[i + 1] & 1) << SHIFT) + d[i]) >>> 1;
  }
  d[l] >>>= 1;

  return norm(a);
}

/**
 * Left shift by 1.
 * @private
 * @param {Integer} a
 * @return {Integer} a << 1
 */
function longDouble(a) {
  var d = a._d;
  var l = a._l;
  var c = 0;

  for (var i = 0, t = 0; i < l; i = i + 1) {
    t = (d[i] << 1) + c;
    d[i] = t & MASK;
    c = t >>> SHIFT;
  }
  if (c) {
    if (l >= a._d.length) {
      var ta = new Uint32Array(l);
      ta.set(d);
      ta[l] = c;
      a._d = ta;
    } else {
      d[l] = c;
    }
    a._l = a._l + 1;
  }

  return norm(a);
}

/**
 * Get length of bit
 * @private
 * @param {Integer} a
 * @return {number}
 */
function longBitLength(a) {
  var ad = a._d;
  var l = a._l;
  return ad[l - 1].toString(2).length + ((l - 1) << 4);
}

/**
 * Multiply with Karatsuba Method.
 * @private
 * @param {Integer} x
 * @param {Integer} y
 * @return {Integer} x * y
 */
function longK(x, y) {
  var N = longBitLength(x);
  var l = longBitLength(y);

  if (N < l) { N = l; }
  if (N < 2001) { return x.mul(y); }

  // number of bits divided by 2, rounded up
  N = (N >>> 1) + (N & 1);

  // x = a + b 2^N, y = c + d 2^N
  var b = x.rightShift(N),
      a = x.sub(b.leftShift(N)),
      d = y.rightShift(N),
      c = y.sub(d.leftShift(N)),
      ac = longK(a, c),
      bd = longK(b, d),
      abcd = longK(a.add(b), c.add(d));

  // xy
  // = (a + 2^N b) (c + 2^N d)
  // = ac + 2^N ((a + b) (c + d) - ac - bd) + 2^(N + 1) bd
  return ac.add(abcd.sub(ac).sub(bd).leftShift(N)).add(bd.leftShift(N << 1));
}

Integer.prototype = {
  /**
   * @const
   * @property Integer#constructor
   * @type Integer
   */
  constructor: Integer,

  /**
   * Convert Integer to String.
   * @method Integer#toString
   * @param {number} [b=10] Base 2, 8, 10 or 16
   * @return {string}
   */
  toString: function(b) {
    b = b | 0;
    if (!b) { b = 10; }

    var i = this._l;
    if (i < 2 && !this._d[0]) { return '0'; }

    var j = 0;
    var hbase = 0;
    switch (b) {
    case 16:
      j = (i << 3) + 2 | 0;
      hbase = 0x10000;
      break;
    case 8:
      j = (i << 4) + 2 | 0;
      hbase = 0x1000;
      break;
    case 2:
      j = (i << 4) + 2 | 0;
      hbase = 0x10;
      break;
    case 10: default:
      j = (i * 241 / 50 | 0) + 2 | 0;
      hbase = 10000;
      break;
    }

    var t = this.clone();
    var d = t._d;
    var k = 0;
    var n = 0;
    var digits = '0123456789abcdef';
    var s = '';

    while (i && j) {
      k = i;
      n = 0;
      while (k--) {
        n = (n << SHIFT) | d[k];
        d[k] = n / hbase | 0;
        n = n % hbase | 0;
      }
      if (!d[i - 1]) { i = i - 1 | 0; }

      k = 4;
      while (k--) {
        s = digits.charAt(n % b | 0) + s;
        j = j - 1 | 0;
        n = n / b | 0;
        if (!i && !n) { break; }
      }
    }

    s = s.replace(/^0+/, '');
    if (!this._s) { s = '-' + s; }

    return s;
  },

  /**
   * Convert Integer to number.
   * @method Integer#valueOf
   * @return {number}
   */
  valueOf: function() {
    var f = .0;
    var d = this._d;
    var i = this._l | 0;

    while (i--) { f = d[i] + BASE * f; }
    if (!this._s) { f = -f; }

    return +f;
  },

  /**
   * @method Integer#digits
   * @return {number[]}
   */
  get digits() { return this._d; },

  /**
   * @method Integer#capacity
   * @return {number}
   */
  get capacity() { return this._d.length | 0; },

  /**
   * @method Integer#arrayLength
   * @return {number}
   */
  get arrayLength() { return this._l | 0; },

  /**
   * @method Integer#sign
   * @return {boolean}
   */
  get sign() { return this._s; },

  /**
   * Copy Integer.
   * @method Integer#clone
   * @return {Integer}
   */
  clone: function() {
    var b = new Integer();
    b._s = this._s;
    b._l = this._l;
    //b._d = this._d.subarray(0, this._l);
    b._d = new Uint32Array(this._l);
    b._d.set(this._d.subarray(0, this._l));

    return b;
  },

  /**
   * Add zeros and shift decimal.
   * @method Integer#addZero
   * @param {number} b Number of zeros.
   * @return {Integer} this * 10<sup>n</sup>
   */
  addZero: function(b) {
    b = b | 0;

    var zeros = '';
    var z = '0';

    for (; b > 0; b = b >>> 1, z = z + z) {
      if (b & 1) { zeros = zeros + z; }
    }

    return longStr(this.toString() + zeros);
  },

  /**
   * <<
   * @method Integer#leftShift
   * @param {number} b
   * @return {Integer}
   */
  leftShift: function(b) {
    b = b | 0;

    var a = this;
    var ad = a._d;
    var l = a._l | 0;
    var d = (b / SHIFT) | 0;
    var cl = l + d + 1 | 0;
    var bb = b % SHIFT;
    var c = longAlloc(cl, a._s);
    var cd = c._d;
    var i = 0;
    var carry = 0;

    for (; (i | 0) < (d | 0); i = i + 1 | 0) { cd[i] = 0; }

    var t = 0;
    for (i = 0; (i | 0) < (l | 0); i = i + 1 | 0) {
      t = (ad[i] << bb) + carry;
      cd[i + d] = t & MASK;
      carry = t >> SHIFT;
    }
    cd[i + d] = carry;

    return norm(c);
  },

  /**
   * >>
   * @method Integer#rightShift
   * @param {number} b
   * @return {Integer}
   */
  rightShift: function(b) {
    var a = this;
    var ad = a._d;
    var l = a._l;
    var d = (b / SHIFT) | 0;

    if (l <= d) { return new Integer(); }

    var bb = b % SHIFT;
    var mask = (1 << bb) - 1;
    var cl = l - d;
    var c = longAlloc(cl, a._s);
    var cd = c._d;
    var i = 0;

    for (; i < cl - 1; i = i + 1) {
      cd[i] = ((ad[i + d + 1] & mask) << (SHIFT - bb)) + (ad[i + d] >> bb);
    }
    cd[i] = ad[i + d] >> bb;

    return norm(c);
  },

  /**
   * @method Integer#isOdd
   * @return {boolean}
   */
  isOdd: function() { return !!(this._d[0] & 1); },

  /**
   * @method Integer#isEven
   * @return {boolean}
   */
  isEven: function() { return !(this._d[0] & 1); },

  /**
   * @method Integer#isNonZero
   * @return {boolean}
   */
  isNonZero: function() { return (this._l > 1 || this._d[0] !== 0); },

  /**
   * Fast squaring.
   * @method Integer#square
   * @return {Integer} this * this
   */
  square: function() {
    var x = this._d;
    var t = this._l;
    var s = longAlloc(t << 1, true);
    var w = s._d;
    longFillZero(s, s._l);

    var i = 0;
    var j = 0;
    var c = 0;
    var uv = 0;
    var u = 0;
    var v = 0;
    for (; i < t; i = i + 1) {
      uv = w[i << 1] + x[i] * x[i];
      u = uv >>> SHIFT;
      v = uv & MASK;
      w[i << 1] = v;
      c = u;

      for (j = i + 1; j < t; j = j + 1) {
        // uv = w[i + j] + (x[j] * x[i] << 1) + c
        // can overflow.
        uv = x[j] * x[i];
        u = (uv >>> SHIFT) << 1;
        v = (uv & MASK) << 1;
        v += w[i + j] + c;
        u += v >>> SHIFT;
        v = v & MASK;
        w[i + j] = v;
        c = u;
      }

      w[i + t] = u;
    }

    return norm(s);
  },

  /**
   * Square root.
   * @method Integer#sqrt
   * @return {Integer} <code>&radic;</code>this
   */
  sqrt: function() {
    if (!this.isNonZero()) { return this; }

    var b = this.clone();
    var c = Integer.one;

    while (b.cmp(c) > 0) {
      longHalf(b);
      longDouble(c);
    }

    do {
      b = c.clone();
      c = this.divmod(c, false).add(c);
      longHalf(c);
    } while (b.cmp(c) > 0);

    return b;
  },

  /**
   * Pow.
   * @method Integer#pow
   * @param {number} b
   * @return {Integer|number} this<sup>b</sup>
   */
  pow: function(b) {
    b = +b;
    if (!b) { return Integer.one; }

    if (b > 0 && b === (b | 0)) {
      b = b | 0;
      var p = Integer.one;
      var a = this.clone();

      for (; b > 0; b >>= 1, a = a.square()) {
        if (b & 1) { p = p.mul(a); }
      }

      return p;
    }

    return Math.pow(this.valueOf(), b);
  },

  /**
   * Greatest Common Divisor.
   * @method Integer#gcd
   * @param {Integer} b
   * @return {Integer}
   */
  gcd: function(b) {
    if (!b.isNonZero()){ return this; }
    var c;
    var a = this.abs();

    while ((c = a.divmod(b, true)).isNonZero()) {
      a = b;
      b = c;
    }

    return b;
  },

  /**
   * Greatest Common Divisor.
   * @method Integer#gcdBin
   * @param {Integer} b
   * @return {Integer}
   */
  gcdBin: function(b) {
    if (this.cmpAbs(b) < 0) { return b.gcdBin(this); }
    if (!b.isNonZero()){ return this; }

    var g = Integer.one;
    var a = this.abs();
    b = b.abs();
    while (!(a._d[0] & 1) && !(b._d[0] & 1)) {
      longHalf(a);
      longHalf(b);
      longDouble(g);
    }

    while (a.isNonZero()) {
      while (!(a._d[0] & 1)) {
        longHalf(a);
      }

      while (!(b._d[0] & 1)) {
        longHalf(b);
      }

      if (a.cmpAbs(b) < 0) {
        b = b.sub(a);
        longHalf(b);
      } else {
        a = a.sub(b);
        longHalf(a);
      }
    }

    return g.mul(b);
  },

  /**
   * Add absolute values of Integer.
   * @method Integer#addAbs
   * @param {Integer} b
   * @param {boolean} sign
   * @return {Integer}
   *        |this| + |b| (sign == true)
   *      -(|this| + |b|) (else)
   */
  addAbs: function(b, sign) {
    if (this._l < b._l) {
      return b.addAbs(this, sign);
    }

    var ad = this._d;
    var bd = b._d;
    var al = this._l;
    var bl = b._l;
    var z = longAlloc(al + 1, sign);
    var zd = z._d;
    var i = 0;
    var num = 0;

    for (; i < bl; i = i + 1) {
      num += ad[i] + bd[i];
      zd[i] = num & MASK;
      num >>>= SHIFT;
    }
    for (; num && i < al; i = i + 1) {
      num += ad[i];
      zd[i] = num & MASK;
      num >>>= SHIFT;
    }
    for (; i < al; i = i + 1) {
      zd[i] = ad[i];
    }
    zd[i] = num & MASK;
    //console.log(z);

    return norm(z);
  },

  /**
   * Subtract absolute values of Integer.
   * @method Integer#subAbs
   * @param {Integer} b
   * @param {boolean} sign
   * @return {Integer}
   *      ||this| - |b|| (sign == true)
   *     -||this| - |b|| (else)
   */
  subAbs: function(b, sign) {
    var ad = this._d;
    var bd = b._d;
    var al = this._l;
    var bl = b._l;
    var z = longAlloc(al, sign);
    var zd = z._d;
    var i = 0;
    var c = 0;

    for (; i < bl; i = i + 1) {
      c = ad[i] - bd[i] - c;
      if (c < 0) {
        zd[i] = c & MASK;
        c = 1;
      } else {
        zd[i] = c;
        c = 0;
      }
    }

    for (; i < al; i = i + 1) {
      c = ad[i] - c;
      if (c < 0) {
        zd[i] = c & MASK;
        c = 1;
      } else {
        zd[i] = c;
        c = 0;
      }
    }

    return norm(z);
  },

  /**
   * Addition.
   * @method Integer#add
   * @param {Integer} b
   * @return {Integer} this + b
   */
  add: function(b) {
    if (this._s !== b._s) {
      if (this.cmpAbs(b) < 0) {
        return b.subAbs(this, b._s);
      }

      return this.subAbs(b, this._s);
    }

    return this.addAbs(b, this._s);
  },

  /**
   * Subtraction.
   * @method Integer#sub
   * @param {Integer} b
   * @return {Integer} this - b
   */
  sub: function(b) {
    if (this._s === b._s) {
      if (this.cmpAbs(b) < 0) {
          return b.subAbs(this, !b._s);
      }

      return this.subAbs(b, this._s);
    }

    return this.addAbs(b, this._s);
  },

  /**
   * Multiplication.
   * @method Integer#mul
   * @param {Integer} b
   * @return {Integer} this * b
   */
  mul: function(b) {
    // if (this.equal(b)) { return this.square(); }

    var ad = this._d;
    var bd = b._d;
    var al = this._l | 0;
    var bl = b._l | 0;
    // if (al > 125 && bl > 125) { return longK(this, b); }

    var j = al + bl | 0;
    var z = longAlloc(j, this._s === b._s);

    longFillZero(z, j);
    for (var i = 0, n = 0, d = 0, e = 0, zd = z._d;
        (i | 0) < (al | 0); i = i + 1 | 0) {
      d = ad[i];
      if (!d) { continue; }

      n = 0;
      for (j = 0; (j | 0) < (bl | 0); j = j + 1 | 0) {
        e = n + d * bd[j];
        n = zd[i + j] + e;
        if (e) { zd[i + j] = n & MASK; }
        n >>>= SHIFT;
      }

      if (n) { zd[i + j] = n | 0; }
    }

    return norm(z);
  },

  /**
   * Multiplication with karatsuba method.
   * @method Integer#kmul
   * @param {Integer} b
   * @return {Integer} this * b
   */
  kmul: function(b) {
    return longK(this, b);
  },

  /**
   * Division or Mod.
   * @method Integer#divmod
   * @param {Integer} b
   * @param {boolean} modulus If true then mod, else div.
   * @throws {Error} zero division
   * @return {Integer}
   *     this % b (modulus == true)
   *     this / b (else)
   */
  divmod: function(b, modulus) {
    var a = this;
    var ad = a._d;
    var bd = b._d;
    var na = a._l;
    var nb = b._l;

    if (nb < 2 && !bd[0]) {
      // zero division
      throw new Error('zero division');
    }

    var albl = na === nb;
    if (na < nb || (albl && ad[na - 1] < bd[nb - 1])) {
      if (modulus) { return a; }
      return new Integer();
    }

    var dd = 0;
    var t = 0;
    var i = 0;
    var z;
    var zd;
    if (nb === 1) {
      dd = bd[0];
      z = a.clone();
      zd = z._d;
      i = na;

      while (i--) {
        t = ((t << SHIFT) | zd[i]) >>> 0;
        zd[i] = (t / dd) & MASK;
        t %= dd;
      }

      if (modulus) {
        if (!a._s) { return longNum(-t); }

        return longNum(t);
      }

      z._s = a._s === b._s;
      return norm(z);
    }

    z = longAlloc(albl ? na + 2 : na + 1, a._s === b._s);
    zd = z._d;
    longFillZero(z, z._l);
    dd = BASE / (bd[nb - 1] + 1) & MASK;

    var j = 0;
    var num = 0;
    if (dd === 1) {
      j = na;
      while (j--) { zd[j] = ad[j]; }
    } else {
      var bb = b.clone();
      var td = bb._d;

      for (; j < nb; j = j + 1) {
        num += bd[j] * dd;
        td[j] = num & MASK;
        num >>>= SHIFT;
      }

      bd = td;
      j = num = 0;

      for (; j < na; j = j + 1) {
        num += ad[j] * dd;
        zd[j] = num & MASK;
        num >>>= SHIFT;
      }

      zd[j] = num & MASK;
    }

    var q = 0;
    var ee = 0;
    j = albl ? na + 1 : na;
    do {
      if (zd[j] === bd[nb - 1]) {
        q = MASK;
      } else {
        q = (((zd[j] << SHIFT) | zd[j - 1]) >>> 0) / bd[nb - 1] & MASK;
      }

      if (q) {
        i = num = t = 0;
        do {
          t += bd[i] * q;
          ee = (t & MASK) - num;
          num = zd[j - nb + i] - ee;
          if (ee) { zd[j - nb + i] = num & MASK; }
          num >>= SHIFT;
          t >>>= SHIFT;
        } while (++i < nb);

        num += zd[j - nb + i] - t;
        while (num) {
          i = num = 0;
          q = q - 1;

          do {
            ee = num + bd[i];
            num = zd[j - nb + i] + ee;
            if (ee) { zd[j - nb + i] = num & MASK; }
            num >>= SHIFT;
          } while (++i < nb);

          num = num - 1;
        }
      }

      zd[j] = q;
    } while (--j >= nb);

    var div = z.clone();
    zd = div._d;
    if (modulus) {
      if (dd) {
        t = 0;
        i = nb;
        while (i--) {
          t = ((t << SHIFT) | zd[i]) >>> 0;
          zd[i] = (t / dd) & MASK;
          t %= dd;
        }
      }
      div._l = nb;
      div._s = a._s;

      return norm(div);
    }

    j = (albl ? na + 2 : na + 1) - nb;
    for (i = 0; i < j; i = i + 1) { zd[i] = zd[i + nb]; }
    div._l = j;

    return norm(div);
  },

  /**
   * Division.
   * @method Integer#div
   * @param {Integer} b
   * @return {Integer} this / b
   */
  div: function(b) {
    return this.divmod(b, false);
  },

  /**
   * Modulo.
   * @method Integer#mod
   * @param {Integer} b
   * @return {Integer} this % b
   */
  mod: function(b) {
    return this.divmod(b, true);
  },

  /**
   * Compare between two absolute values of Integer objects.
   * @method Integer#cmpAbs
   * @param {Integer} b
   * @return {number}
   *      -1 (|this| < |b|)
   *       0 (|this| = |b|)
   *       1 (|this| > |b|)
   */
  cmpAbs: function(b) {
    if (this === b) { return 0; }

    var ad = this._d;
    var bd = b._d;
    var al = this._l;
    var bl = b._l;

    if (al < bl) { return -1; }
    if (al > bl) { return 1; }

    do { al = al - 1; } while (al && ad[al] === bd[al]);
    if (!al && ad[0] === bd[0]) { return 0; }

    return ad[al] > bd[al] ? 1 : -1;
  },

  /**
   * Compare between two Integer.
   * @method Integer#cmp
   * @param {Integer} b
   * @return {number}
   *     -1 (this < b)
   *      0 (this = b)
   *      1 (this > b)
   */
  cmp: function(b) {
    if (this === b) { return 0; }
    if (this._s !== b._s) { return this._s ? 1 : -1; }

    var ad = this._d;
    var bd = b._d;
    var al = this._l;
    var bl = b._l;

    if (al < bl) { return this._s ? -1 : 1; }
    if (al > bl) { return this._s ? 1 : -1; }

    do { al = al - 1; } while (al && ad[al] === bd[al]);
    if (!al && ad[0] === bd[0]) {
      return (this._s ? 1 : 0) - (b._s ? 1 : 0);
    }

    if (ad[al] > bd[al]) { return this._s ? 1 : -1; }
    return this._s ? -1 : 1;
  },

  /**
   * ==
   * @method Integer#eq
   * @param {Integer} b
   * @return {boolean}
   */
  eq: function(b) {
    if (this === b) { return true; }

    b = any(b);
    if (this._s !== b._s) { return false; }

    var ad = this._d;
    var bd = b._d;
    var l = this._l;
    if (l !== b._l) { return false; }

    for (var i = 0; i < l; i = i + 1) {
      if (ad[i] !== bd[i]) { return false; }
    }

    return true;
  },

  /**
   * ===
   * @method Integer#equal
   * @param {Integer} b
   * @return {boolean}
   */
  equal: function(b) {
    if (this === b) { return true; }
    if (!(b instanceof Integer)) { return false; }
    if (this._s !== b._s) { return false; }

    var ad = this._d;
    var bd = b._d;
    var l = this._l;
    if (l !== b._l) { return false; }

    for (var i = 0; i < l; i = i + 1) {
      if (ad[i] !== bd[i]) { return false; }
    }

    return true;
  },

  /**
   * Absolute Integer.
   * @method Integer#abs
   * @return {Integer} |this|.
   */
  abs: function() {
    var z = this.clone();
    z._s = true;
    return z;
  },

  /**
   * Negate Integer.
   * @method Integer#neg
   * @return {Integer} -this.
   */
  neg: function() {
    var z = this.clone();
    if (z.isNonZero()) { z._s = !z._s; }
    return z;
  }
};

exports.Integer = Integer;
