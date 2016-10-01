/// <reference path="../node_modules/@ktn/type/typings/ktn.d.ts"/>
'use strict';
/**
 * @param {Ast} a
 * @return {Ast}
 */
function neg(a) {
    return {
        argument: a,
        operator: '-',
        type: 'Unary',
    };
}
/**
 * @param {string} operator
 * @param {Ast} a
 * @param {Ast} b
 * @return {Ast}
 */
function binary(operator, a, b) {
    return {
        left: a,
        operator: operator,
        right: b,
        type: 'Binary',
    };
}
/**
 * @param {string} name
 * @param {Ast} a
 * @return {Ast}
 */
function func(name, a) {
    return {
        arguments: [a],
        name: name,
        type: 'Function',
    };
}
/**
 * @class Parser
 * @property {Array<string>} _tokens
 * @property {int} _index
 */
var Parser = (function () {
    /**
     * @param {Array<string>} tokens
     */
    function Parser(tokens) {
        if (!tokens) {
            throw new Error("Parser: tokens is blank");
        }
        this._index = 0;
        this._tokens = tokens;
    }
    Object.defineProperty(Parser.prototype, "tokens", {
        /**
         * @return {Array<string>}
         */
        get: function () {
            return this._tokens;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {Ast}
     */
    Parser.prototype.parse = function () {
        this._index = 0;
        return this.expression();
    };
    /**
     * @private
     * @return {Ast}
     */
    Parser.prototype.number = function () {
        var sign;
        if (this._tokens[this._index] === '+' || this._tokens[this._index] === '-') {
            sign = this._tokens[this._index++];
        }
        var token = this._tokens[this._index++];
        var ast = {
            type: 'Int',
            value: token,
        };
        if (token === '$p') {
        }
        else if (token === '$e') {
        } /* else if (isNaN(+ans)) {
          ans = vari(ans);
        }*/
        if (this._tokens[this._index] === '^') {
            this._index += 1;
            ast = binary('^', ast, this.factor());
        }
        if (sign === '-') {
            return neg(ast);
        }
        return ast;
    };
    /**
     * @private
     * @return {Ast}
     */
    Parser.prototype.factor = function () {
        var funcName = '';
        if (this._tokens[this._index] === '$sin'
            || this._tokens[this._index] === '$cos'
            || this._tokens[this._index] === '$tan') {
            funcName = this._tokens[this._index].substring(1);
            this._index += 1;
        }
        if (this._tokens[this._index] === '(') {
            this._index += 1;
            var ast = this.expression();
            if (this._tokens[this._index] !== ')') {
                throw new SyntaxError('Missing )');
            }
            this._index += 1;
            if (funcName) {
                return func(funcName, ast);
            }
            if (this._tokens[this._index] === '^') {
                this._index += 1;
                ast = binary('^', ast, this.factor());
            }
            return ast;
        }
        return this.number();
    };
    /**
     * @private
     * @return {Ast}
     */
    Parser.prototype.term = function () {
        var ast = this.factor();
        while (true) {
            if (this._tokens[this._index] === '^') {
                this._index += 1;
                ast = binary('^', ast, this.factor());
            }
            else if (this._tokens[this._index] === '*') {
                this._index += 1;
                ast = binary('*', ast, this.factor());
            }
            else if (this._tokens[this._index] === '/') {
                this._index += 1;
                var x = this.factor();
                if (!x) {
                    throw new Error('ZeroDivideError');
                }
                ast = binary('/', ast, x);
            }
            else {
                break;
            }
        }
        return ast;
    };
    /**
     * @private
     * @return {Ast}
     */
    Parser.prototype.expression = function () {
        var ast = this.term();
        while (true) {
            if (this._tokens[this._index] === '+') {
                this._index += 1;
                ast = binary('+', ast, this.term());
            }
            else if (this._tokens[this._index] === '-') {
                this._index += 1;
                ast = binary('-', ast, this.term());
            }
            else {
                break;
            }
        }
        return ast;
    };
    return Parser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Parser;
//# sourceMappingURL=parser.js.map