/**
 * Mul
 */
'use strict';
/**
 * @private
 * @requires Rational
 */
var rational_1 = require('@ktn/rational');
/**
 * Mul
 * @class Mul
 * @property {Array<?>} _items
 */
var Mul = (function () {
    /**
     * @param {Array<?>} items
     */
    function Mul(items) {
        this._items = items;
    }
    /**
     * @static
     * @param {...?} items
     * @return {Mul}
     */
    Mul.mul = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return new Mul(items);
    };
    /**
     * @return {string}
     */
    Mul.prototype.toString = function () {
        return "mul(" + this._items + ")";
    };
    /**
     * @return {Rational}
     */
    Mul.prototype.calc = function () {
        var v = rational_1.default.one;
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (typeof (item.calc) === 'function') {
                v = v.mul(item.calc());
            }
            else {
                v = v.mul(rational_1.default.str("" + item));
            }
        }
        return v;
    };
    /**
     * @retrun {Mul}
     */
    Mul.prototype.clone = function () {
        var a = [];
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
        }
        return new Mul(a);
    };
    /**
     * @return {Mul}
     */
    Mul.prototype.neg = function () {
        var a = [];
        var isFirst = true;
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            var b = typeof (item.clone) !== 'undefined' ? item.clone() : item;
            if (isFirst) {
                isFirst = false;
                a.push(typeof (b.neg) !== 'undefined' ? b.neg() : -b);
            }
            else {
                a.push(b);
            }
        }
        return new Mul(a);
    };
    /**
     * @return {Mul}
     */
    Mul.prototype.inv = function () {
        var a = [];
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            var b = typeof (item.clone) !== 'undefined' ? item.clone() : item;
            a.push(typeof (b.inv) !== 'undefined' ? b.inv() : rational_1.default.str("1/" + b));
        }
        return new Mul(a);
    };
    return Mul;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mul;
//# sourceMappingURL=mul.js.map