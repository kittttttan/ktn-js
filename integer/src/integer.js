/// <reference path="../node_modules/@ktn/type/typings/ktn.d.ts" />
/// <reference path="../node_modules/@ktn/type/typings/polyfill.d.ts" />
/**
 * Big Integer in JavaScript.
 */
'use strict';
require('@ktn/core');
/**
 * @private
 * @const
 * @type !int
 */
var _SHIFT = 16;
/**
 * @private
 * @const
 * @type !int
 */
var _BASE = 1 << _SHIFT;
/**
 * @private
 * @const
 * @type !int
 */
var _MASK = _BASE - 1;
/**
 * Integer
 * @class Integer
 * @property {Uint32Array} Integer#_d Digits [d0, d1, ..., dn]
 * @property {boolean} Integer#_s Sign +, -. `false` means -.
 * @property {int} Integer#_l Length of digits
 */
var Integer = (function () {
    /**
     * Initialize 0
     */
    function Integer() {
        this._d = new Uint32Array(3);
        this._s = true;
        this._l = 1;
    }
    Object.defineProperty(Integer, "SHIFT", {
        /**
         * @static
         * @const
         * @property {!int} SHIFT
         */
        get: function () {
            return _SHIFT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer, "BASE", {
        /**
         * @static
         * @const
         * @property {!int} BASE
         */
        get: function () {
            return _BASE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer, "MASK", {
        /**
         * @static
         * @const
         * @property {!int} MASK
         */
        get: function () {
            return _MASK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer, "one", {
        /**
         * 1
         * @static
         * @method Integer.one
         * @return {!Integer} 1.
         */
        get: function () {
            return Integer.num(1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer, "zero", {
        /**
         * 0
         * @static
         * @method Integer.zero
         * @return {!Integer} 0.
         */
        get: function () {
            return new Integer();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts integer to Integer.
     * @static
     * @method Integer.num
     * @param {!int} n -0x7fffffff <= n <= 0x7fffffff
     * @return {!Integer}
     *
     * @example
     * Integer.num(0);       // 0
     * Integer.num(1234567); // 1234567
     * Integer.num(-37);     // -37
     */
    Integer.num = function (n) {
        n = n | 0;
        var a = new Integer();
        if (!n) {
            return a;
        }
        if (n < 0) {
            n = -n;
            a._s = false;
        }
        a._d[0] = n & _MASK;
        n = n >>> _SHIFT;
        if (n) {
            a._d[1] = n & _MASK;
            a._l = 2;
        }
        return a;
    };
    /**
     * Converts digit string to Integer.
     * @static
     * @method Integer.str
     * @param {!string} str For example '-9' or 'FF' etc.
     * @param {int=} [base=10] 2, 8, 10 or 16
     * @return {!Integer}
     *
     * @example
     * Integer.str('77');     // 77
     * Integer.str('ff', 16); // 255
     * Integer.str('111', 2); // 7
     */
    Integer.str = function (str, base) {
        if (base === void 0) { base = 10; }
        var index = 0;
        var sign = true;
        if (str.charAt(index) === '+') {
            index = index + 1;
        }
        else if (str.charAt(index) === '-') {
            sign = false;
            index = index + 1;
        }
        // ignore following zeros. '00102' is regarded as '102'.
        while (str.charAt(index) === '0') {
            index = index + 1;
        }
        if (!str.charAt(index)) {
            return Integer.zero;
        }
        var len = 0;
        if (base === 8) {
            len = 3 * (str.length + 1 - index);
        }
        else {
            if (!str.charAt(index)) {
                index = index - 1;
            }
            len = (str.length + 1 - index) << 2;
        }
        len = (len >>> 4) + 1;
        var z = Integer.alloc(len, sign);
        z.fillZero(len);
        var zd = z._d;
        var bl = 1;
        for (;;) {
            var c = str.charAt(index);
            index = index + 1;
            if (!c) {
                break;
            }
            var n = parseInt(c, base);
            for (var i = 0;;) {
                for (; i < bl; i = i + 1) {
                    n = n + zd[i] * base;
                    zd[i] = n & _MASK;
                    n = n >>> _SHIFT;
                }
                if (!n) {
                    break;
                }
                bl = bl + 1;
            }
        }
        return z.norm();
    };
    /**
     * Converts exponential string to Integer.
     * @static
     * @method Integer.exp
     * @param {!string} a
     * @return {!Integer}
     * @example
     *   Integer.exp("7");      // 7
     *   Integer.exp("7e3");    // 7000
     *   Integer.exp("314e-2"); // 3
     */
    Integer.exp = function (a) {
        var i = a.indexOf('e', 0);
        if (i < 0) {
            // 'e' is not found
            return Integer.str(a);
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
        }
        else {
            s += '0'.repeat(e);
        }
        return Integer.str(s);
    };
    /**
     * Converts anything to Integer.
     * @static
     * @method Integer.any
     * @param {!*} a
     * @return {!Integer}
     * @example
     *   Integer.any(0);         // 0
     *   Integer.any(1234567);   // 1234567
     *   Integer.any(-12.34567); // -12
     *   Integer.any("37");      // 37
     */
    Integer.any = function (a) {
        if (typeof a === 'object') {
            if (a instanceof Integer) {
                return a.clone();
            }
            return new Integer();
        }
        if (typeof a === 'number') {
            a = +a;
            if (-0x7fffffff <= a && a <= 0x7fffffff) {
                return Integer.num(a);
            }
            a += '';
        }
        if (typeof a === 'string') {
            return Integer.exp(a);
        }
        return new Integer();
    };
    /**
     * @static
     * @method Integer.factorial
     * @param {!int} n
     * @return {!Integer}
     * @example
     *   Integer.factorial(3); // 1*2*3 = 6
     */
    Integer.factorial = function (n) {
        n = n | 0;
        if (n < 1) {
            return Integer.one;
        }
        return Integer.factOdd(n).mul(Integer.factEven(n));
    };
    /**
     * @param {int} n
     * @return {!Integer}
     */
    Integer.factOdd = function (n) {
        n = n | 0;
        var m = Integer.one;
        var limit = 1 << ((_SHIFT - 1) << 1);
        for (var i = 0;; i = i + 1 | 0) {
            var l = (n / (1 << i)) | 0;
            if (l < 3) {
                break;
            }
            var mi = 1;
            var mj = 1;
            for (var j = 3; (j | 0) <= (l | 0); j = j + 2 | 0) {
                mi = mi * j;
                if (mi > limit) {
                    m = m.mul(Integer.num(mj));
                    mi = mj = j;
                }
                else {
                    mj = mi;
                }
            }
            if ((mj | 0) > 1) {
                m = m.mul(Integer.num(mj));
            }
        }
        return m;
    };
    /**
     * @private
     * @param {int} n
     * @return {!Integer}
     */
    Integer.factEven = function (n) {
        n = n | 0;
        var s = 0;
        while (n) {
            n = n >>> 1;
            s = s + n;
        }
        return Integer.one.leftShift(s);
    };
    /**
     * Set length.
     * @private
     * @param {!int} length
     * @param {boolean=} sign
     * @return {!Integer}
     */
    Integer.alloc = function (length, sign) {
        length = length | 0;
        var a = new Integer();
        a._s = sign ? true : false;
        a._l = length;
        a._d = new Uint32Array(length);
        return a;
    };
    /**
     * Convert Integer to String.
     * @override
     * @method Integer#toString
     * @param {int=} [b=10] Base 2, 8, 10 or 16
     * @return {!string}
     */
    Integer.prototype.toString = function (b) {
        if (b === void 0) { b = 10; }
        var i = this._l;
        if (i < 2 && !this._d[0]) {
            return '0';
        }
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
            case 10:
            default:
                j = (i * 241 / 50 | 0) + 2 | 0;
                hbase = 10000;
                break;
        }
        var digits = '0123456789abcdef';
        var t = this.clone();
        var d = t._d;
        var s = '';
        while (i && j) {
            var k = i;
            var n = 0;
            while (k--) {
                n = (n << _SHIFT) | d[k];
                d[k] = n / hbase | 0;
                n = n % hbase | 0;
            }
            if (!d[i - 1]) {
                i = i - 1 | 0;
            }
            k = 4;
            while (k--) {
                s = digits.charAt(n % b | 0) + s;
                j = j - 1 | 0;
                n = n / b | 0;
                if (!i && !n) {
                    break;
                }
            }
        }
        s = s.replace(/^0+/, '');
        if (!this._s) {
            s = "-" + s;
        }
        return s;
    };
    Object.defineProperty(Integer.prototype, "digits", {
        /**
         * @method Integer#digits
         * @return {Uint32Array}
         */
        get: function () {
            return this._d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer.prototype, "capacity", {
        /**
         * @method Integer#capacity
         * @return {!int}
         */
        get: function () {
            return this._d.length | 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer.prototype, "arrayLength", {
        /**
         * @method Integer#arrayLength
         * @return {!int}
         */
        get: function () {
            return this._l | 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Integer.prototype, "sign", {
        /**
         * @method Integer#sign
         * @return {!boolean}
         */
        get: function () {
            return this._s;
        },
        /**
         * @method Integer#sign
         * @param {!boolean} sign
         */
        set: function (sign) {
            this._s = !!sign;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copy Integer.
     * @method Integer#clone
     * @return {!Integer}
     */
    Integer.prototype.clone = function () {
        var b = new Integer();
        b._s = this._s;
        b._l = this._l;
        b._d = new Uint32Array(this._l);
        b._d.set(this._d.subarray(0, this._l));
        return b;
    };
    /**
     * Add zeros and shift decimal.
     * @method Integer#addZero
     * @param {!int} b int of zeros.
     * @return {!Integer} this * 10<sup>n</sup>
     */
    Integer.prototype.addZero = function (b) {
        b = b | 0;
        return Integer.str(this.toString() + '0'.repeat(b));
    };
    /**
     * <<
     * @method Integer#leftShift
     * @param {!int} b
     * @return {!Integer}
     */
    Integer.prototype.leftShift = function (b) {
        b = b | 0;
        var a = this;
        var ad = a._d;
        var l = a._l | 0;
        var d = b / _SHIFT | 0;
        var cl = l + d + 1 | 0;
        var bb = b % _SHIFT;
        var c = Integer.alloc(cl, a._s);
        var cd = c._d;
        for (var i_1 = 0; (i_1 | 0) < (d | 0); i_1 = i_1 + 1 | 0) {
            cd[i_1] = 0;
        }
        var carry = 0;
        var i = 0;
        for (; (i | 0) < (l | 0); i = i + 1 | 0) {
            var t = (ad[i] << bb) + carry;
            cd[i + d] = t & _MASK;
            carry = t >> _SHIFT;
        }
        cd[i + d] = carry;
        return c.norm();
    };
    /**
     * >>
     * @method Integer#rightShift
     * @param {!int} b
     * @return {!Integer}
     */
    Integer.prototype.rightShift = function (b) {
        var a = this;
        var ad = a._d;
        var l = a._l;
        var d = b / _SHIFT | 0;
        if (l <= d) {
            return new Integer();
        }
        var bb = b % _SHIFT;
        var mask = (1 << bb) - 1;
        var cl = l - d;
        var c = Integer.alloc(cl, a._s);
        var cd = c._d;
        var i = 0;
        for (; i < cl - 1; i = i + 1) {
            cd[i] = ((ad[i + d + 1] & mask) << (_SHIFT - bb)) + (ad[i + d] >> bb);
        }
        cd[i] = ad[i + d] >> bb;
        return c.norm();
    };
    /**
     * @method Integer#isOdd
     * @return {!boolean}
     */
    Integer.prototype.isOdd = function () { return !!(this._d[0] & 1); };
    /**
     * @method Integer#isEven
     * @return {!boolean}
     */
    Integer.prototype.isEven = function () { return !(this._d[0] & 1); };
    /**
     * @method Integer#isNonZero
     * @return {!boolean}
     */
    Integer.prototype.isNonZero = function () { return this._l > 1 || this._d[0] !== 0; };
    /**
     * Fast squaring.
     * @method Integer#square
     * @return {!Integer} this * this
     */
    Integer.prototype.square = function () {
        var x = this._d;
        var t = this._l;
        var s = Integer.alloc(t << 1, true);
        var w = s._d;
        s.fillZero(s._l);
        for (var i = 0; i < t; i = i + 1) {
            var uv = w[i << 1] + x[i] * x[i];
            var u = uv >>> _SHIFT;
            var v = uv & _MASK;
            w[i << 1] = v;
            var c = u;
            for (var j = i + 1; j < t; j = j + 1) {
                // uv = w[i + j] + (x[j] * x[i] << 1) + c
                // can overflow.
                uv = x[j] * x[i];
                u = (uv >>> _SHIFT) << 1;
                v = (uv & _MASK) << 1;
                v += w[i + j] + c;
                u += v >>> _SHIFT;
                v = v & _MASK;
                w[i + j] = v;
                c = u;
            }
            w[i + t] = u;
        }
        return s.norm();
    };
    /**
     * Square root.
     * @method Integer#sqrt
     * @return {!Integer} <code>&radic;</code>this
     */
    Integer.prototype.sqrt = function () {
        if (!this.isNonZero()) {
            return this;
        }
        var b = this.clone();
        var c = Integer.one;
        while (b.cmp(c) > 0) {
            b.half();
            c.double();
        }
        do {
            b = c.clone();
            c = this.divmod(c, false).add(c);
            c.half();
        } while (b.cmp(c) > 0);
        return b;
    };
    /**
     * Pow.
     * @method Integer#pow
     * @param {!int} b
     * @return {!Integer} this<sup>b</sup>
     */
    Integer.prototype.pow = function (b) {
        b = +b;
        if (b < 0 || Math.floor(b) !== b) {
            throw new Error('Not implemented pow(b) if b is neither natural int nor zero.');
        }
        if (!b) {
            return Integer.one;
        }
        if (this.equal(Integer.one)) {
            return Integer.one;
        }
        b = b | 0;
        var p = Integer.one;
        var a = this.clone();
        for (; b > 0; b >>= 1, a = a.square()) {
            if (b & 1) {
                p = p.mul(a);
            }
        }
        return p;
    };
    /**
     * Greatest Common Divisor.
     * @method Integer#gcd
     * @param {!Integer} b
     * @return {!Integer}
     */
    Integer.prototype.gcd = function (b) {
        if (!b.isNonZero()) {
            return this;
        }
        var c;
        var a = this.abs();
        while ((c = a.divmod(b, true)).isNonZero()) {
            a = b;
            b = c;
        }
        return b;
    };
    /**
     * Greatest Common Divisor.
     * @method Integer#gcdBin
     * @param {!Integer} b
     * @return {!Integer}
     */
    Integer.prototype.gcdBin = function (b) {
        if (this.cmpAbs(b) < 0) {
            return b.gcdBin(this);
        }
        if (!b.isNonZero()) {
            return this;
        }
        var g = Integer.one;
        var a = this.abs();
        b = b.abs();
        while (!(a._d[0] & 1) && !(b._d[0] & 1)) {
            a.half();
            b.half();
            g.double();
        }
        while (a.isNonZero()) {
            while (!(a._d[0] & 1)) {
                a.half();
            }
            while (!(b._d[0] & 1)) {
                b.half();
            }
            if (a.cmpAbs(b) < 0) {
                b = b.sub(a);
                b.half();
            }
            else {
                a = a.sub(b);
                a.half();
            }
        }
        return g.mul(b);
    };
    /**
     * Add absolute values of Integer.
     * @method Integer#addAbs
     * @param {!Integer} b
     * @param {boolean} sign
     * @return {!Integer}
     *        |this| + |b| (sign == true)
     *      -(|this| + |b|) (else)
     */
    Integer.prototype.addAbs = function (b, sign) {
        if (this._l < b._l) {
            return b.addAbs(this, sign);
        }
        var ad = this._d;
        var bd = b._d;
        var al = this._l;
        var bl = b._l;
        var z = Integer.alloc(al + 1, sign);
        var zd = z._d;
        var i = 0;
        var num = 0;
        for (; i < bl; i = i + 1) {
            num += ad[i] + bd[i];
            zd[i] = num & _MASK;
            num >>>= _SHIFT;
        }
        for (; num && i < al; i = i + 1) {
            num += ad[i];
            zd[i] = num & _MASK;
            num >>>= _SHIFT;
        }
        for (; i < al; i = i + 1) {
            zd[i] = ad[i];
        }
        zd[i] = num & _MASK;
        // console.log(z);
        return z.norm();
    };
    /**
     * Subtract absolute values of Integer.
     * @method Integer#subAbs
     * @param {!Integer} b
     * @param {boolean} sign
     * @return {!Integer}
     *      ||this| - |b|| (sign == true)
     *     -||this| - |b|| (else)
     */
    Integer.prototype.subAbs = function (b, sign) {
        var ad = this._d;
        var bd = b._d;
        var al = this._l;
        var bl = b._l;
        var z = Integer.alloc(al, sign);
        var zd = z._d;
        var i = 0;
        var c = 0;
        for (; i < bl; i = i + 1) {
            c = ad[i] - bd[i] - c;
            if (c < 0) {
                zd[i] = c & _MASK;
                c = 1;
            }
            else {
                zd[i] = c;
                c = 0;
            }
        }
        for (; i < al; i = i + 1) {
            c = ad[i] - c;
            if (c < 0) {
                zd[i] = c & _MASK;
                c = 1;
            }
            else {
                zd[i] = c;
                c = 0;
            }
        }
        return z.norm();
    };
    /**
     * Addition.
     * @method Integer#add
     * @param {!Integer} b
     * @return {!Integer} this + b
     */
    Integer.prototype.add = function (b) {
        if (this._s !== b._s) {
            if (this.cmpAbs(b) < 0) {
                return b.subAbs(this, b._s);
            }
            return this.subAbs(b, this._s);
        }
        return this.addAbs(b, this._s);
    };
    /**
     * Subtraction.
     * @method Integer#sub
     * @param {!Integer} b
     * @return {!Integer} this - b
     */
    Integer.prototype.sub = function (b) {
        if (this._s === b._s) {
            if (this.cmpAbs(b) < 0) {
                return b.subAbs(this, !b._s);
            }
            return this.subAbs(b, this._s);
        }
        return this.addAbs(b, this._s);
    };
    /**
     * Multiplication.
     * @method Integer#mul
     * @param {!Integer} b
     * @return {!Integer} this * b
     */
    Integer.prototype.mul = function (b) {
        // if (this.equal(b)) { return this.square(); }
        var ad = this._d;
        var bd = b._d;
        var al = this._l | 0;
        var bl = b._l | 0;
        // if (al > 125 && bl > 125) { return longK(this, b); }
        var abl = al + bl | 0;
        var z = Integer.alloc(abl, this._s === b._s);
        z.fillZero(abl);
        var zd = z._d;
        for (var i = 0, j = void 0; (i | 0) < (al | 0); i = i + 1 | 0) {
            var d = ad[i];
            if (!d) {
                continue;
            }
            var n = 0;
            for (j = 0; (j | 0) < (bl | 0); j = j + 1 | 0) {
                var e = n + d * bd[j];
                n = zd[i + j] + e;
                if (e) {
                    zd[i + j] = n & _MASK;
                }
                n >>>= _SHIFT;
            }
            if (n) {
                zd[i + j] = n | 0;
            }
        }
        return z.norm();
    };
    /**
     * Multiplication with karatsuba method.
     * @method Integer#kmul
     * @param {!Integer} y
     * @return {!Integer} this * y
     */
    Integer.prototype.kmul = function (y) {
        var x = this;
        var N = x.bitLength();
        var l = y.bitLength();
        if (N < l) {
            N = l;
        }
        if (N < 2001) {
            return x.mul(y);
        }
        // int of bits divided by 2, rounded up
        N = (N >>> 1) + (N & 1);
        // x = a + b 2^N, y = c + d 2^N
        var b = x.rightShift(N);
        var a = x.sub(b.leftShift(N));
        var d = y.rightShift(N);
        var c = y.sub(d.leftShift(N));
        var ac = a.kmul(c);
        var bd = b.kmul(d);
        var abcd = a.add(b).kmul(c.add(d));
        // xy
        // = (a + 2^N b) (c + 2^N d)
        // = ac + 2^N ((a + b) (c + d) - ac - bd) + 2^(N + 1) bd
        return ac.add(abcd.sub(ac).sub(bd).leftShift(N)).add(bd.leftShift(N << 1));
    };
    /**
     * Division or Mod.
     * @method Integer#divmod
     * @param {!Integer} b
     * @param {boolean=} modulus If true then mod, else div.
     * @throws {Error} zero division
     * @return {!Integer}
     *     this % b (modulus == true)
     *     this / b (else)
     */
    Integer.prototype.divmod = function (b, modulus) {
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
            if (modulus) {
                return a;
            }
            return new Integer();
        }
        var t = 0;
        if (nb === 1) {
            var dd_1 = bd[0];
            var z_1 = a.clone();
            var zd_1 = z_1._d;
            var i_2 = na;
            while (i_2--) {
                t = ((t << _SHIFT) | zd_1[i_2]) >>> 0;
                zd_1[i_2] = (t / dd_1) & _MASK;
                t %= dd_1;
            }
            if (modulus) {
                if (!a._s) {
                    return Integer.num(-t);
                }
                return Integer.num(t);
            }
            z_1._s = a._s === b._s;
            return z_1.norm();
        }
        var z = Integer.alloc(albl ? na + 2 : na + 1, a._s === b._s);
        var zd = z._d;
        z.fillZero(z._l);
        var dd = _BASE / (bd[nb - 1] + 1) & _MASK;
        var j = 0;
        var num = 0;
        if (dd === 1) {
            j = na;
            while (j--) {
                zd[j] = ad[j];
            }
        }
        else {
            var bb = b.clone();
            var td = bb._d;
            for (; j < nb; j = j + 1) {
                num += bd[j] * dd;
                td[j] = num & _MASK;
                num >>>= _SHIFT;
            }
            bd = td;
            j = num = 0;
            for (; j < na; j = j + 1) {
                num += ad[j] * dd;
                zd[j] = num & _MASK;
                num >>>= _SHIFT;
            }
            zd[j] = num & _MASK;
        }
        var i = 0;
        var q = 0;
        var ee = 0;
        j = albl ? na + 1 : na;
        do {
            if (zd[j] === bd[nb - 1]) {
                q = _MASK;
            }
            else {
                q = (((zd[j] << _SHIFT) | zd[j - 1]) >>> 0) / bd[nb - 1] & _MASK;
            }
            if (q) {
                i = num = t = 0;
                do {
                    t += bd[i] * q;
                    ee = (t & _MASK) - num;
                    num = zd[j - nb + i] - ee;
                    if (ee) {
                        zd[j - nb + i] = num & _MASK;
                    }
                    num >>= _SHIFT;
                    t >>>= _SHIFT;
                } while (++i < nb);
                num += zd[j - nb + i] - t;
                while (num) {
                    i = num = 0;
                    q = q - 1;
                    do {
                        ee = num + bd[i];
                        num = zd[j - nb + i] + ee;
                        if (ee) {
                            zd[j - nb + i] = num & _MASK;
                        }
                        num >>= _SHIFT;
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
                    t = ((t << _SHIFT) | zd[i]) >>> 0;
                    zd[i] = (t / dd) & _MASK;
                    t %= dd;
                }
            }
            div._l = nb;
            div._s = a._s;
            return div.norm();
        }
        j = (albl ? na + 2 : na + 1) - nb;
        for (i = 0; i < j; i = i + 1) {
            zd[i] = zd[i + nb];
        }
        div._l = j;
        return div.norm();
    };
    /**
     * Division.
     * @method Integer#div
     * @param {!Integer} b
     * @return {!Integer} this / b
     */
    Integer.prototype.div = function (b) {
        return this.divmod(b, false);
    };
    /**
     * Modulo.
     * @method Integer#mod
     * @param {!Integer} b
     * @return {!Integer} this % b
     */
    Integer.prototype.mod = function (b) {
        return this.divmod(b, true);
    };
    /**
     * Compare between two absolute values of Integer objects.
     * @method Integer#cmpAbs
     * @param {!Integer} b
     * @return {!int}
     *      -1 (|this| < |b|)
     *       0 (|this| = |b|)
     *       1 (|this| > |b|)
     */
    Integer.prototype.cmpAbs = function (b) {
        if (this === b) {
            return 0;
        }
        var ad = this._d;
        var bd = b._d;
        var al = this._l;
        var bl = b._l;
        if (al < bl) {
            return -1;
        }
        if (al > bl) {
            return 1;
        }
        do {
            al = al - 1;
        } while (al && ad[al] === bd[al]);
        if (!al && ad[0] === bd[0]) {
            return 0;
        }
        return ad[al] > bd[al] ? 1 : -1;
    };
    /**
     * Compare between two Integer.
     * @method Integer#cmp
     * @param {!Integer} b
     * @return {!int}
     *     -1 (this < b)
     *      0 (this = b)
     *      1 (this > b)
     */
    Integer.prototype.cmp = function (b) {
        if (this === b) {
            return 0;
        }
        if (this._s !== b._s) {
            return this._s ? 1 : -1;
        }
        var ad = this._d;
        var bd = b._d;
        var al = this._l;
        var bl = b._l;
        if (al < bl) {
            return this._s ? -1 : 1;
        }
        if (al > bl) {
            return this._s ? 1 : -1;
        }
        do {
            al = al - 1;
        } while (al && ad[al] === bd[al]);
        if (!al && ad[0] === bd[0]) {
            return (this._s ? 1 : 0) - (b._s ? 1 : 0);
        }
        if (ad[al] > bd[al]) {
            return this._s ? 1 : -1;
        }
        return this._s ? -1 : 1;
    };
    /**
     * ==
     * @method Integer#eq
     * @param {!Integer} b
     * @return {!boolean}
     */
    Integer.prototype.eq = function (b) {
        if (this === b) {
            return true;
        }
        b = Integer.any(b);
        if (this._s !== b._s) {
            return false;
        }
        var ad = this._d;
        var bd = b._d;
        var l = this._l;
        if (l !== b._l) {
            return false;
        }
        for (var i = 0; i < l; i = i + 1) {
            if (ad[i] !== bd[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * ===
     * @method Integer#equal
     * @param {!Integer} b
     * @return {!boolean}
     */
    Integer.prototype.equal = function (b) {
        if (this === b) {
            return true;
        }
        if (!(b instanceof Integer)) {
            return false;
        }
        if (this._s !== b._s) {
            return false;
        }
        var ad = this._d;
        var bd = b._d;
        var l = this._l;
        if (l !== b._l) {
            return false;
        }
        for (var i = 0; i < l; i = i + 1) {
            if (ad[i] !== bd[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Absolute Integer.
     * @method Integer#abs
     * @return {!Integer} |this|.
     */
    Integer.prototype.abs = function () {
        var z = this.clone();
        z._s = true;
        return z;
    };
    /**
     * Negate Integer.
     * @method Integer#neg
     * @return {!Integer} -this.
     */
    Integer.prototype.neg = function () {
        var z = this.clone();
        if (z.isNonZero()) {
            z._s = !z._s;
        }
        return z;
    };
    /**
     * Get length of bit
     * @return {!int}
     */
    Integer.prototype.bitLength = function () {
        var d = this._d;
        var l = this._l;
        return d[l - 1].toString(2).length + ((l - 1) << 4);
    };
    /**
     * Right shift by 1.
     * @return {!Integer} a >> 1
     */
    Integer.prototype.half = function () {
        var a = this;
        var d = a._d;
        var l = a._l - 1;
        for (var i = 0; i < l; i = i + 1) {
            d[i] = (((d[i + 1] & 1) << _SHIFT) + d[i]) >>> 1;
        }
        d[l] >>>= 1;
        return a.norm();
    };
    /**
     * Left shift by 1.
     * @return {!Integer} a << 1
     */
    Integer.prototype.double = function () {
        var a = this;
        var d = a._d;
        var l = a._l;
        var c = 0;
        for (var i = 0; i < l; i = i + 1) {
            var t = (d[i] << 1) + c;
            d[i] = t & _MASK;
            c = t >>> _SHIFT;
        }
        if (c) {
            if (l >= a._d.length) {
                var ta = new Uint32Array(l);
                ta.set(d);
                ta[l] = c;
                a._d = ta;
            }
            else {
                d[l] = c;
            }
            a._l = a._l + 1;
        }
        return a.norm();
    };
    /**
     * Delete following zeros. [2, 0, 1, 0, 0] -> [2, 0, 1]
     * @return {!Integer}
     */
    Integer.prototype.norm = function () {
        var a = this;
        var d = a._d;
        var l = a._l | 0;
        do {
            l = l - 1 | 0;
        } while (l && !d[l]);
        a._l = l + 1 | 0;
        // -0 -> +0
        if (!l && !d[l]) {
            a._s = true;
        }
        return a;
    };
    /**
     * Assign zero to initialize.
     * @param {!int} n Length.
     * @return {!Integer}
     */
    Integer.prototype.fillZero = function (n) {
        n = n | 0;
        if (n < 0) {
            throw new RangeError("Integer#fillZero(n): n must >= 0 but " + n);
        }
        var a = this;
        var d = a._d;
        while (n--) {
            d[n] = 0;
        }
        return a;
    };
    return Integer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Integer;
//# sourceMappingURL=integer.js.map