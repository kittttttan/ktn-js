/// <reference path="../node_modules/@ktn/type/typings/polyfill.d.ts"/>
'use strict';
require('@ktn/core');
/**
 * @private
 * @type string
 */
var NUM_CHARAS = '0123456789.';
/**
 * @private
 * @type string
 */
var OPE_CHARAS = '+-*/^()';
/**
 * @class Scanner
 * @property {string} _src
 * @property {int} _index
 */
var Scanner = (function () {
    /**
     * @paran {string} src
     */
    function Scanner(src) {
        this._src = src;
        this._index = 0;
    }
    /**
     * @return {boolean}
     */
    Scanner.prototype.eof = function () {
        return this._index >= this._src.length;
    };
    /**
     * parse comments, spaces, linebrakes, etc.
     * @return {string}
     */
    Scanner.prototype.comment = function () {
        var s = '';
        while (!this.eof()) {
            var ch = this._src[this._index];
            // console.log(`comment ${ch}`);
            if (ch === ' ') {
                ++this._index;
            }
            else if ('\r\n'.includes(ch)) {
                ++this._index;
            }
            else {
                break;
            }
        }
        return s;
    };
    /**
     * tokenize top
     * @return {string}
     */
    Scanner.prototype.lex = function () {
        if (this.eof()) {
            return null;
        }
        var ch = this._src[this._index];
        if (NUM_CHARAS.includes(ch)) {
            return this.num();
        }
        return this.punctuator();
    };
    /**
     * tokenize number
     * @return {string}
     */
    Scanner.prototype.num = function () {
        var n = this._src[this._index++];
        var ch = this._src[this._index];
        // console.log(`num ${n} ${ch}`);
        while (NUM_CHARAS.includes(ch)) {
            n += ch;
            ch = this._src[++this._index];
        }
        return n;
    };
    /**
     * tokenize punctuator
     * @return {string}
     */
    Scanner.prototype.punctuator = function () {
        var s = this._src[this._index];
        // console.log(`punctuator ${s}`);
        if (OPE_CHARAS.includes(s)) {
            ++this._index;
            return s;
        }
        var ss = this._src.substr(this._index, 2);
        if (ss === '**') {
            this._index += 2;
            return '^';
        }
        return s;
    };
    return Scanner;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Scanner;
//# sourceMappingURL=scanner.js.map