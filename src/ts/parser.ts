export interface Ast {
  type: string;
  name?: string;
  value?: string;
  operator?: string;
  left?: Ast;
  right?: Ast;
  argument?: Ast;
  arguments?: Ast[];
}

/**
 * @param {Ast} a
 * @return {Ast}
 */
function neg(a: Ast): Ast {
  return {
    type: 'Unary',
    operator: '-',
    argument: a
  }
}

/**
 * @param {string} operator
 * @param {Ast} a
 * @param {Ast} b
 * @return {Ast}
 */
function binary(operator: string, a: Ast, b: Ast) {
  return {
    type: 'Binary',
    operator: operator,
    left: a,
    right: b
  }
}

/**
 * @param {string} name
 * @param {Ast} a
 * @return {Ast}
 */
function func(name: string, a: Ast): Ast {
  return {
    type: 'Function',
    name: name,
    arguments: [a]
  }
}

/**
 * @class Parser
 * @property {Array<string>} _tokens
 * @property {int} _index
 */
export class Parser {
  protected _tokens: string[];
  protected _index: int;

  /**
   * @return {Array<string>}
   */
  get tokens(): string[] {
    return this._tokens;
  }

  /**
   * @param {Array<string>} tokens
   */
  constructor(tokens: string[]) {
    if (!tokens) {
      throw new Error(`Parser: tokens is blank`);
    }
    this._index = 0;
    this._tokens = tokens;
  }

  /**
   * @return {Ast}
   */
  public parse(): Ast {
    this._index = 0;
    return this.expression();
  }

  /**
   * @private
   * @return {Ast}
   */
  private number(): Ast {
    let sign: string;
    if (this._tokens[this._index] === '+' || this._tokens[this._index] === '-') {
      sign = this._tokens[this._index++];
    }

    const token: string = this._tokens[this._index++];
    let ast: Ast = {
      type: 'Int',
      value: token
    };
    if (token === '$p') {
      //ast = Const.PI;
    } else if (token === '$e') {
      //ast = Const.E;
    }/* else if (isNaN(+ans)) {
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
  }

  /**
   * @private
   * @return {Ast}
   */
  private factor(): Ast {
    let funcName: string = '';
    if (this._tokens[this._index] === '$sin'
        || this._tokens[this._index] === '$cos'
        || this._tokens[this._index] === '$tan') {
      funcName = this._tokens[this._index].substring(1);
      this._index += 1;
    }
    if (this._tokens[this._index] === '(') {
      this._index += 1;
      let ast: Ast = this.expression();
      if (this._tokens[this._index] !== ')') {
        throw new SyntaxError('Missing )');
      }
      this._index += 1;
      if (funcName) { return func(funcName, ast); }
      if (this._tokens[this._index] === '^') {
        this._index += 1;
        ast = binary('^', ast, this.factor());
      }
      return ast;
    }
    return this.number();
  }

  /**
   * @private
   * @return {Ast}
   */
  private term(): Ast {
    let ast: Ast = this.factor();
    while (true) {
      if (this._tokens[this._index] === '^') {
        this._index += 1;
        ast = binary('^', ast, this.factor());
      } else if (this._tokens[this._index] === '*') {
        this._index += 1;
        ast = binary('*', ast, this.factor());
      } else if (this._tokens[this._index] === '/') {
        this._index += 1;
        const x: Ast = this.factor();
        if (!x) {
          throw new Error('ZeroDivideError');
        }
        ast = binary('/', ast, x);
      } else {
        break;
      }
    }

    return ast;
  }

  /**
   * @private
   * @return {Ast}
   */
  private expression(): Ast {
    let ast: Ast = this.term();
    while (true) {
      if (this._tokens[this._index] === '+') {
        this._index += 1;
        ast = binary('+', ast, this.term());
      } else if (this._tokens[this._index] === '-') {
        this._index += 1;
        ast = binary('-', ast, this.term());
      } else {
        break;
      }
    }

    return ast;
  }
}