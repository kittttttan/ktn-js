import {Tokenizer} from './tokenizer';
import {Parser, Ast} from './parser';
import {Add} from './add';
import {Mul} from './mul';
import {Div} from './div';
import {Pow} from './pow';
import {Trigon, Sin, Cos, Tan} from './trigon';

const add: (...items: any[]) => Add = Add.add;
const sub: (...items: any[]) => Add = Add.sub;
const mul: (...items: any[]) => Mul = Mul.mul;
const div: (...items: any[]) => Div = Div.div;
const pow: (a: any, p: any) => Pow = Pow.pow;

function neg(a: any): any {
  if (typeof (a.neg) === 'function') {
    return a.neg();
  }
  return -a;
}

const sin: (a: any) => Sin = Trigon.sin;
const cos: (a: any) => Cos = Trigon.cos;
const tan: (a: any) => Tan = Trigon.tan;

/**
 * MathExpression
 */
export class MathExpression {
  protected _ast: Ast|null;
  protected _tokens: string[];
  protected _p: Parser|null;
  protected _t: Tokenizer;

  public static create(str: string): MathExpression {
    return new MathExpression(str);
  }

  get tokens(): string[] {
    return this._tokens;
  }

  get ast(): Ast|null {
    return this._ast;
  }

  constructor(src: string) {
    this._t = new Tokenizer(src);
    this._p = null;
    this._tokens = [];
    this._ast = null;
  }

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

  public eval(): any {
    const ast: Ast = this.parse();
    if (ast === null) return null;
    return this._parseAst(ast);
  }

  private _parseAst(ast: Ast|undefined): any {
    if (ast === undefined) return null;

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
        if (ast.arguments === undefined) return null;
        return sin(this._parseAst(ast.arguments[0]));
      }
      if (ast.name === 'cos') {
        if (ast.arguments === undefined) return null;
        return cos(this._parseAst(ast.arguments[0]));
      }
      if (ast.name === 'tan') {
        if (ast.arguments === undefined) return null;
        return tan(this._parseAst(ast.arguments[0]));
      }
    }
  }

  private tokenize(): string[] {
    const tokens: string[] = this._tokens;
    if (tokens.length > 0) {
      return tokens;
    }

    for (;;) {
      const token: string = this._t.next();
      // console.log(`token ${token}`);
      if (!token) {
        break;
      }
      tokens.push(token);
    }
    this._tokens = tokens;

    return tokens;
  }
}
