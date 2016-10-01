'use strict';
require('@ktn/core');
/**
 * Complex
 * @class Complex
 * @property {!double} Complex#_r
 * @property {!double} Complex#_i
 */
var Complex = (function () {
    /**
     * @param {double} r
     * @param {double} i
     */
    function Complex(r, i) {
        this._r = +r;
        this._i = +i;
    }
    Object.defineProperty(Complex.prototype, "real", {
        /**
         * @type {!double}
         */
        get: function () {
            return this._r;
        },
        set: function (real) {
            this._r = real;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Complex.prototype, "imag", {
        /**
         * @type {!double}
         */
        get: function () {
            return this._i;
        },
        set: function (imag) {
            this._i = imag;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @method Complex#toString
     * @return {!string}
     */
    Complex.prototype.toString = function () {
        return "(" + this._r + (this._i < 0 ? '' : '+') + this._i + "J)";
    };
    /**
     * @method Complex#clone
     * @return {!Complex}
     */
    Complex.prototype.clone = function () {
        return new Complex(this._r, this._i);
    };
    /**
     * @method Complex#scale
     * @param {!double} a
     * @return {!Complex}
     */
    Complex.prototype.scale = function (a) {
        a = +a;
        return new Complex(this._r * a, this._i * a);
    };
    /**
     * @method Complex#conj
     * @return {!Complex}
     */
    Complex.prototype.conj = function () {
        return new Complex(this._r, -this._i);
    };
    /**
     * @method Complex#add
     * @param {!Complex} a
     * @return {!Complex}
     */
    Complex.prototype.add = function (a) {
        return new Complex(this._r + a._r, this._i + a._i);
    };
    /**
     * @method Complex#sub
     * @param {!Complex} a
     * @return {!Complex}
     */
    Complex.prototype.sub = function (a) {
        return new Complex(this._r - a._r, this._i - a._i);
    };
    /**
     * @method Complex#mul
     * @param {!Complex} a
     * @return {!Complex}
     */
    Complex.prototype.mul = function (a) {
        return new Complex(this._r * a._r - this._i * a._i, this._r * a._i + this._i * a._r);
    };
    return Complex;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Complex;
//# sourceMappingURL=complex.js.map