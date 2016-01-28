'use strict';

/**
 * @private
 * @requires Tokenizer
 */
import {Tokenizer} from './tokenizer';

/**
 * @private
 * @requires Tokenizer
 */
import {Ast, Parser} from './parser';

/**
 * @private
 * @requires Add
 */
import {Add} from './add';
/**
 * @private
 * @requires Mul
 */
import {Mul} from './mul';
/**
 * @private
 * @requires Div
 */
import {Div} from './div';
/**
 * @private
 * @requires Pow
 */
import {Pow} from './pow';
/**
 * @private
 * @requires Trigon
 */
import {Trigon} from './trigon';
/**
 * @private
 * @requires Const
 */
import {Const} from './const';

/**
 * @private
 */
const add = Add.add;
/**
 * @private
 */
const sub = Add.sub;
/**
 * @private
 */
const mul = Mul.mul;
/**
 * @private
 */
const div = Div.div;
/**
 * @private
 */
const pow = Pow.pow;
/**
 * @private
 */
const neg = (a) => {
  if (typeof (a.neg) === 'function') {
    return a.neg();
  }
  return -a;
};

/**
 * @private
 */
const sin = Trigon.sin;
/**
 * @private
 */
const cos = Trigon.cos;
/**
 * @private
 */
const tan = Trigon.tan;

/**
 * MathExpression
 * @class MathExpression
 * @property {Array<string>} _tokens
 * @property {Tokenizer} _t
 * @property {Parser} _p
 */
export class MathExpression {
  protected _ast: Ast;
  protected _tokens: string[];
  protected _p: Parser;
  protected _t: Tokenizer;

  /**
   * @return {Array<string>}
   */
  get tokens(): string[] {
    return this._tokens;
  }

  /**
   * @return {Ast}
   */
  get ast(): Ast {
    return this._ast;
  }

  /**
   * @param {string} src
   */
  constructor(src: string) {
    this._t = new Tokenizer(src);
    this._p = null;
    this._tokens = [];
    this._ast = null;
  }

  /**
   * @return {Array<string>}
   */
  private tokenize(): string[] {
    let tokens: string[] = this._tokens;
    if (tokens.length > 0) {
      return tokens;
    }

    while (true) {
      let token: string = this._t.next();
      //console.log(`token ${token}`);
      if (!token) {
        break;
      }
      tokens.push(token);
    }
    this._tokens = tokens;

    return tokens;
  }

  /**
   * @static
   * @param {string} str
   * @return {MathExpression}
   */
  public static create(str: string): MathExpression {
    return new MathExpression(str);
  }

  /**
   * @return {Ast}
   */
  public parse(): Ast {
    if (this._tokens.length === 0) {
      this._tokens = this.tokenize();
    }
    if (!this._p) {
      this._p = new Parser(this._tokens);
    }
    if (!this._ast) {
      this._ast = this._p.parse();
    }
    return this._ast;
  }

  /**
   * 
   */
  public eval() {
    const ast: Ast = this.parse();
    return this._parseAst(ast);
  }

  /**
   * @param {Ast} ast
   */
  private _parseAst(ast: Ast) {
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

  }
}
