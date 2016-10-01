/**
 * Constant
 */
'use strict';
/**
 * Const
 * @class Const
 */
var Const = (function () {
    function Const() {
    }
    Object.defineProperty(Const, "PI", {
        /**
         * @static
         * @type {ConstItem}
         */
        get: function () {
            return {
                calc: function () { return Math.PI; },
                toString: function () { return 'pi'; },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const, "E", {
        /**
         * @static
         * @type {ConstItem}
         */
        get: function () {
            return {
                calc: function () { return Math.E; },
                toString: function () { return 'e'; },
            };
        },
        enumerable: true,
        configurable: true
    });
    return Const;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Const;
//# sourceMappingURL=const.js.map