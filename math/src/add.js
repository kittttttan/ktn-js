/// <reference path="../node_modules/@ktn/type/typings/rational.d.ts"/>
/**
 * Add
 */
'use strict';
/**
 * @private
 * @requires Rational
 */
var rational_1 = require('@ktn/rational');
/**
 * Add
 * @class Add
 * @property {Array<?>} _items
 */
var Add = (function () {
    /**
     * @param {Array<?>} items
     */
    function Add(items) {
        this._items = items;
    }
    /**
     * @method Add.add
     * @param {...?} items
     * @return {Add}
     */
    Add.add = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        return new Add(items);
    };
    /**
     * @method Add.sub
     * @param {...?} items
     * @return {Add}
     */
    Add.sub = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        var l = items.length;
        if (l === 0) {
            return new Add([]);
        }
        var n = [items[0]];
        for (var i = 1; i < l; ++i) {
            var item = items[i];
            if (typeof (item.neg) === 'function') {
                item = item.neg();
            }
            else {
                item = rational_1.default.str("" + -item);
            }
            n.push(item);
        }
        return new Add(n);
    };
    /**
     * @method Add#toString
     * @return {string}
     */
    Add.prototype.toString = function () {
        return "add(" + this._items + ")";
    };
    /**
     * @method Add#calc
     * @return {Rational}
     */
    Add.prototype.calc = function () {
        var v = rational_1.default.zero;
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (typeof (item.calc) === 'function') {
                v = v.add(item.calc());
            }
            else {
                v = v.add(rational_1.default.str("" + item));
            }
        }
        return v;
    };
    /**
     * @method Add#clone
     * @return {Add}
     */
    Add.prototype.clone = function () {
        var a = [];
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            a.push(typeof (item.clone) !== 'undefined' ? item.clone() : item);
        }
        return new Add(a);
    };
    /**
     * @method Add#neg
     * @return {Add}
     */
    Add.prototype.neg = function () {
        var a = [];
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            var b = typeof (item.clone) !== 'undefined' ? item.clone() : item;
            a.push(typeof (b.neg) !== 'undefined' ? b.neg() : b);
        }
        return new Add(a);
    };
    return Add;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Add;
//# sourceMappingURL=add.js.map