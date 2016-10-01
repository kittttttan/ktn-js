/// <reference path="../node_modules/@ktn/type/typings/ktn.d.ts"/>
/**
 * Trigonometric function
 */
'use strict';
/**
 * Sin
 * @class Sin
 */
var Sin = (function () {
    /**
     * @property {?} _a
     * @param {?} a
     */
    function Sin(a) {
        this._a = a;
    }
    /**
     * @return {string}
     */
    Sin.prototype.toString = function () {
        return "sin(" + this._a + ")";
    };
    /**
     * @return {double}
     */
    Sin.prototype.calc = function () {
        var v = 0;
        var a = this._a;
        if (typeof (a.calc) === 'function') {
            v = a.calc();
        }
        else {
            v = parseFloat(a);
        }
        return Math.sin(v);
    };
    return Sin;
}());
exports.Sin = Sin;
/**
 * Cos
 * @class Cos
 */
var Cos = (function () {
    /**
     * @property {?} _a
     * @param {?} a
     */
    function Cos(a) {
        this._a = a;
    }
    /**
     * @return {string}
     */
    Cos.prototype.toString = function () {
        return "cos(" + this._a + ")";
    };
    /**
     * @return {double}
     */
    Cos.prototype.calc = function () {
        var v = 0;
        var a = this._a;
        if (typeof (a.calc) === 'function') {
            v = a.calc();
        }
        else {
            v = parseFloat(a);
        }
        return Math.cos(v);
    };
    return Cos;
}());
exports.Cos = Cos;
/**
 * Tan
 * @class Tan
 */
var Tan = (function () {
    /**
     * @property {?} _a
     * @param {?} a
     */
    function Tan(a) {
        this._a = a;
    }
    /**
     * @return {string}
     */
    Tan.prototype.toString = function () {
        return "tan(" + this._a + ")";
    };
    /**
     * @return {double}
     */
    Tan.prototype.calc = function () {
        var v = 0;
        var a = this._a;
        if (typeof (a.calc) === 'function') {
            v = a.calc();
        }
        else {
            v = parseFloat(a);
        }
        return Math.tan(v);
    };
    return Tan;
}());
exports.Tan = Tan;
/**
 * Trigon
 * @class Trigon
 */
var Trigon = (function () {
    function Trigon() {
    }
    /**
     * @static
     * @param {?} a
     * @return {Sin}
     */
    Trigon.sin = function (a) {
        return new Sin(a);
    };
    /**
     * @static
     * @param {?} a
     * @return {Cos}
     */
    Trigon.cos = function (a) {
        return new Cos(a);
    };
    /**
     * @static
     * @param {?} a
     * @return {Tan}
     */
    Trigon.tan = function (a) {
        return new Tan(a);
    };
    return Trigon;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Trigon;
//# sourceMappingURL=trigon.js.map