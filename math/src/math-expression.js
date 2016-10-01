'use strict';
/**
 * @private
 * @requires Tokenizer
 */
var tokenizer_1 = require('./tokenizer');
/**
 * @private
 * @requires Tokenizer
 */
var parser_1 = require('./parser');
/**
 * @private
 * @requires Add
 */
var add_1 = require('./add');
/**
 * @private
 * @requires Mul
 */
var mul_1 = require('./mul');
/**
 * @private
 * @requires Div
 */
var div_1 = require('./div');
/**
 * @private
 * @requires Pow
 */
var pow_1 = require('./pow');
/**
 * @private
 * @requires Trigon
 */
var trigon_1 = require('./trigon');
/**
 * @private
 */
var add = add_1.default.add;
/**
 * @private
 */
var sub = add_1.default.sub;
/**
 * @private
 */
var mul = mul_1.default.mul;
/**
 * @private
 */
var div = div_1.default.div;
/**
 * @private
 */
var pow = pow_1.default.pow;
/**
 * @private
 */
function neg(a) {
    if (typeof (a.neg) === 'function') {
        return a.neg();
    }
    return -a;
}
;
/**
 * @private
 */
var sin = trigon_1.default.sin;
/**
 * @private
 */
var cos = trigon_1.default.cos;
/**
 * @private
 */
var tan = trigon_1.default.tan;
/**
 * MathExpression
 * @class MathExpression
 * @property {Array<string>} _tokens
 * @property {Tokenizer} _t
 * @property {Parser} _p
 */
var MathExpression = (function () {
    /**
     * @param {string} src
     */
    function MathExpression(src) {
        this._t = new tokenizer_1.default(src);
        this._p = null;
        this._tokens = [];
        this._ast = null;
    }
    /**
     * @static
     * @param {string} str
     * @return {MathExpression}
     */
    MathExpression.create = function (str) {
        return new MathExpression(str);
    };
    Object.defineProperty(MathExpression.prototype, "tokens", {
        /**
         * @return {Array<string>}
         */
        get: function () {
            return this._tokens;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MathExpression.prototype, "ast", {
        /**
         * @return {Ast}
         */
        get: function () {
            return this._ast;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {Ast}
     */
    MathExpression.prototype.parse = function () {
        if (this._tokens.length === 0) {
            this._tokens = this.tokenize();
        }
        if (!this._p) {
            this._p = new parser_1.default(this._tokens);
        }
        if (!this._ast) {
            this._ast = this._p.parse();
        }
        return this._ast;
    };
    /**
     * @return {Object}
     */
    MathExpression.prototype.eval = function () {
        var ast = this.parse();
        return this._parseAst(ast);
    };
    /**
     * @param {Ast} ast
     * @return {Object}
     */
    MathExpression.prototype._parseAst = function (ast) {
        if (ast.type === 'Int') {
            return ast.value;
        }
        if (ast.type === 'Unary') {
            if (ast.operator === '-') {
                return neg(this._parseAst(ast.argument));
            }
        }
        if (ast.type === 'Binary') {
            if (ast.operator === '+') {
                return add(this._parseAst(ast.left), this._parseAst(ast.right));
            }
            if (ast.operator === '-') {
                return sub(this._parseAst(ast.left), this._parseAst(ast.right));
            }
            if (ast.operator === '*') {
                return mul(this._parseAst(ast.left), this._parseAst(ast.right));
            }
            if (ast.operator === '/') {
                return div(this._parseAst(ast.left), this._parseAst(ast.right));
            }
            if (ast.operator === '^') {
                return pow(this._parseAst(ast.left), this._parseAst(ast.right));
            }
        }
        if (ast.type === 'Function') {
            if (ast.name === 'sin') {
                return sin(this._parseAst(ast.arguments[0]));
            }
            if (ast.name === 'cos') {
                return cos(this._parseAst(ast.arguments[0]));
            }
            if (ast.name === 'tan') {
                return tan(this._parseAst(ast.arguments[0]));
            }
        }
    };
    /**
     * @return {Array<string>}
     */
    MathExpression.prototype.tokenize = function () {
        var tokens = this._tokens;
        if (tokens.length > 0) {
            return tokens;
        }
        while (true) {
            var token = this._t.next();
            // console.log(`token ${token}`);
            if (!token) {
                break;
            }
            tokens.push(token);
        }
        this._tokens = tokens;
        return tokens;
    };
    return MathExpression;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MathExpression;
//# sourceMappingURL=math-expression.js.map