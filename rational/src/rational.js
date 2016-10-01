/// <reference path="../node_modules/@ktn/type/typings/ktn.d.ts" />
/// <reference path="../node_modules/@ktn/type/typings/polyfill.d.ts" />
/// <reference path="../node_modules/@ktn/type/typings/integer.d.ts" />
/**
 * Rational
 */
'use strict';
require('@ktn/core');
/**
 * @private
 * @requires Integer
 */
var integer_1 = require('@ktn/integer');
/**
 * Rational
 *
 * @class Rational
 * @property {!Integer} Rational#_n Numerator
 * @property {!Integer} Rational#_d Denominator
 */
var Rational = (function () {
    /**
     * @param {!Integer} n
     * @param {!Integer} d
     * @param {boolean=} f If f is true then skip cancel().
     */
    function Rational(n, d, f) {
        if (f) {
            this._n = n;
            this._d = d;
        }
        else {
            var t = Rational.cancel(n, d);
            this._n = t[0];
            this._d = t[1];
        }
    }
    Object.defineProperty(Rational, "one", {
        /**
         * 1
         * @static
         * @method Rational.one
         * @return {!Rational} 1
         */
        get: function () {
            return new Rational(integer_1.default.one, integer_1.default.one, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rational, "zero", {
        /**
         * 0
         * @static
         * @method Rational.zero
         * @return {!Rational} 0
         */
        get: function () {
            return new Rational(integer_1.default.zero, integer_1.default.one, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Convert Number to Rational.
     * @static
     * @method Rational.num
     * @param {!int} a Numerator
     * @param {!int=} b Denominator
     * @param {boolean=} c
     * @return {!Rational}
     */
    Rational.num = function (a, b, c) {
        if (!b) {
            return new Rational(integer_1.default.num(a), integer_1.default.one, true);
        }
        return new Rational(integer_1.default.num(a), integer_1.default.num(b), c);
    };
    /**
     * Convert String to Rational.
     * @static
     * @method Rational.str
     * @param {!string} a ex.'-1/2', '0.1/1.02'.
     * @return {!Rational}
     */
    Rational.str = function (a) {
        var as = a.split('/');
        as[1] = as[1] || '1';
        // sign
        var _a = [as[0][0] === '-', as[1][0] === '-'], s1 = _a[0], s2 = _a[1];
        as[0] = as[0].replace(/[\-\+]/g, '');
        as[1] = as[1].replace(/[\-\+]/g, '');
        // dot
        var _b = [as[0].indexOf('.'), as[1].indexOf('.')], d1 = _b[0], d2 = _b[1];
        var _c = [d1 < 0 ? 0 : as[0].length - d1 - 1, d2 < 0 ? 0 : as[1].length - d2 - 1], l1 = _c[0], l2 = _c[1];
        as[0] = as[0].replace('.', '').replace(/^0*(\d+)$/, '$1');
        as[1] = as[1].replace('.', '').replace(/^0*(\d+)$/, '$1');
        if (l1 > l2) {
            as[1] = "" + as[1] + '0'.repeat(l1 - l2);
        }
        else if (l1 < l2) {
            as[0] = "" + as[0] + '0'.repeat(l2 - l1);
        }
        // sign
        if (s1 !== s2) {
            as[0] = "-" + as[0];
        }
        return new Rational(integer_1.default.str(as[0]), integer_1.default.str(as[1]));
    };
    /**
     * Convert anything to Rational.
     * @static
     * @method Rational.any
     * @param {!*} a
     * @param {!*=} b
     * @throws {Error} ZeroDivisionError
     * @return {!Rational}
     */
    Rational.any = function (a, b) {
        if (!arguments.length) {
            return Rational.zero;
        }
        if (arguments.length === 1) {
            if (a instanceof Rational) {
                return a.clone();
            }
            if (typeof a === 'string') {
                return Rational.str(a);
            }
            return new Rational(integer_1.default.any(a), integer_1.default.one, true);
        }
        if (!b) {
            throw new Error('zero division');
        }
        if (!a) {
            return Rational.zero;
        }
        return new Rational(integer_1.default.any(a), integer_1.default.any(b));
    };
    /**
     * @static
     * @method Rational.cancel
     * @param {!Integer} a
     * @param {!Integer} b
     * @return {!Array<!Integer>}
     */
    Rational.cancel = function (a, b) {
        var g = a.gcd(b);
        a = a.div(g);
        b = b.div(g);
        if (!b.sign) {
            a.sign = !a.sign;
            b.sign = true;
        }
        return [a, b];
    };
    /**
     * @method Rational#clone
     * @return {!Rational}
     */
    Rational.prototype.clone = function () {
        return new Rational(this._n, this._d, true);
    };
    /**
     * @method Rational#toString
     * @return {!string}
     */
    Rational.prototype.toString = function () {
        if (this._d.equal(integer_1.default.one)) {
            return this._n.toString();
        }
        return this._n + "/" + this._d;
    };
    /**
     * @method Rational#html
     * @return {!string}
     */
    Rational.prototype.html = function () {
        return this.toString();
    };
    /**
     * @method Rational#tex
     * @return {!string}
     */
    Rational.prototype.tex = function () {
        // if (this._d == 1) {return this._n.toString();}
        return "\\frac{" + this._n + "}{" + this._d + "}";
    };
    Object.defineProperty(Rational.prototype, "sign", {
        get: function () {
            return this._n.sign;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @method Rational#abs
     * @return {!Rational} |this|.
     */
    Rational.prototype.abs = function () {
        return new Rational(this._n.abs(), this._d, true);
    };
    /**
     * @method Rational#neg
     * @return {!Rational} -this.
     */
    Rational.prototype.neg = function () {
        return new Rational(this._n.neg(), this._d, true);
    };
    /**
     * @method Rational#eq
     * @param {!?} b
     * @return {!boolean} this == b.
     */
    Rational.prototype.eq = function (b) {
        b = Rational.any(b);
        if (this._n.eq(b._n) && this._d.eq(b._d)) {
            return true;
        }
        return false;
    };
    /**
     * @method Rational#equal
     * @param {!Rational} b
     * @return {!boolean} this === b.
     */
    Rational.prototype.equal = function (b) {
        if (!(b instanceof Rational)) {
            return false;
        }
        if (this._n.equal(b._n) && this._d.equal(b._d)) {
            return true;
        }
        return false;
    };
    /**
     * @method Rational#cmp
     * @param {!Rational} b
     * @return {!int}
     *   1 (this > b)
     *   0 (this = b)
     *  -1 (this < b).
     */
    Rational.prototype.cmp = function (b) {
        return this._n.mul(b._d).cmp(this._d.mul(b._n));
    };
    /**
     * Multiplicative inverse (or reciprocal)
     * @method Rational#inv
     * @return {!Rational}
     */
    Rational.prototype.inv = function () {
        var n = this._n;
        var d = this._d;
        if (!n.isNonZero()) {
            throw new Error('zero division');
        }
        if (!n.sign) {
            return new Rational(d.neg(), n.neg(), true);
        }
        return new Rational(d, n, true);
    };
    /**
     * @method Rational#add
     * @param {!Rational} b
     * @return {!Rational} this + b.
     */
    Rational.prototype.add = function (b) {
        return new Rational(this._n.mul(b._d).add(this._d.mul(b._n)), this._d.mul(b._d));
    };
    /**
     * @method Rational#sub
     * @param {!Rational} b
     * @return {!Rational} this - b.
     */
    Rational.prototype.sub = function (b) {
        return new Rational(this._n.mul(b._d).sub(this._d.mul(b._n)), this._d.mul(b._d));
    };
    /**
     * @method Rational#mul
     * @param {!Rational} b
     * @return {!Rational} this * b.
     */
    Rational.prototype.mul = function (b) {
        return new Rational(this._n.mul(b._n), this._d.mul(b._d));
    };
    /**
     * @method Rational#div
     * @param {!Rational} b
     * @return {!Rational} this / b.
     */
    Rational.prototype.div = function (b) {
        return new Rational(this._n.mul(b._d), this._d.mul(b._n));
    };
    /**
     * @method Rational#pow
     * @param {!int} b
     * @return {!Rational} this ^ b.
     */
    Rational.prototype.pow = function (b) {
        return new Rational(this._n.pow(b), this._d.pow(b), true);
    };
    return Rational;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rational;
//# sourceMappingURL=rational.js.map