/// <reference path="../node_modules/@ktn/type/typings/rational.d.ts"/>
/**
 * Pow
 */
'use strict';
/**
 * @private
 * @requires Rational
 */
var rational_1 = require('@ktn/rational');
/**
 * Pow
 * @class Pow
 * @property {?} _a
 * @property {?} _p
 */
var Pow = (function () {
    /**
     * @param {?} a
     * @param {?} p
     */
    function Pow(a, p) {
        this._a = a;
        this._p = p;
    }
    /**
     * @static
     * @param {?} a
     * @param {?} p
     * @return {Pow}
     */
    Pow.pow = function (a, p) {
        return new Pow(a, p);
    };
    /**
     * @return {string}
     */
    Pow.prototype.toString = function () {
        return "pow(" + this._a + "," + this._p + ")";
    };
    /**
     * @return {?}
     */
    Pow.prototype.calc = function () {
        var a = this._a;
        var p = this._p;
        if (typeof (a.calc) === 'function') {
            a = a.calc();
        }
        else {
            a = rational_1.default.str("" + a);
        }
        if (typeof (p.calc) === 'function') {
            p = p.calc();
        }
        else {
            p = parseFloat(p);
        }
        return a.pow(p);
    };
    return Pow;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pow;
//# sourceMappingURL=pow.js.map