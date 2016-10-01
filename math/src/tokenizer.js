'use strict';
/**
 * @private
 * @requires Scanner
 */
var scanner_1 = require('./scanner');
/**
 * @class Tokenizer
 * @property {Scanner} _scanner
 * @property {Array} _buffer
 */
var Tokenizer = (function () {
    /**
     * @param {string} src
     */
    function Tokenizer(src) {
        this._scanner = new scanner_1.default(src);
        this._buffer = [];
    }
    /**
     * @return {string}
     */
    Tokenizer.prototype.next = function () {
        if (this._buffer.length === 0) {
            this._scanner.comment();
            if (!this._scanner.eof()) {
                var token = this._scanner.lex();
                // console.log(`next ${token}`);
                this._buffer.push(token);
            }
        }
        return this._buffer.shift();
    };
    return Tokenizer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tokenizer;
//# sourceMappingURL=tokenizer.js.map