/// <reference path="../node_modules/@ktn/type/typings/rational.d.ts"/>
/**
 * Div
 */
'use strict';
/**
 * @private
 * @requires Rational
 */
var rational_1 = require('@ktn/rational');
/**
 * Div
 * @class Div
 * @property {Array<?>} _items
 */
var Div = (function () {
    /**
     * @param {Array<?>} items
     */
    function Div(items) {
        this._items = items;
    }
    /**
     * @method Div.div
     * @param {...?} items
     * @return {Div}
     */
    Div.div = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return new Div(items);
    };
    /**
     * @method Div#toString
     * @return {string}
     */
    Div.prototype.toString = function () {
        return "div(" + this._items + ")";
    };
    /**
     * @method Div#calc
     * @return {Rational}
     */
    Div.prototype.calc = function () {
        var v = rational_1.default.one;
        var isFirst = true;
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (isFirst) {
                isFirst = false;
                v = (typeof (item.calc) === 'function') ? item.calc() : rational_1.default.str("" + item);
                continue;
            }
            if (typeof (item.calc) === 'function') {
                v = v.div(item.calc());
            }
            else {
                v = v.div(rational_1.default.str("" + item));
            }
        }
        return v;
    };
    /**
     * @method Div#clone
     * @returtn {Div}
     */
    Div.prototype.clone = function () {
        var a = [];
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
        }
        return new Div(a);
    };
    /**
     * @method Div#neg
     * @return {Div}
     */
    Div.prototype.neg = function () {
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
        return new Div(a);
    };
    return Div;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Div;
//# sourceMappingURL=div.js.map