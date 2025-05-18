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

function neg(a: Ast): Ast {
  return {
    argument: a,
    operator: '-',
    type: 'Unary',
  };
}

function binary(operator: string, a: Ast, b: Ast): Ast {
  return {
    left: a,
    operator: operator,
    right: b,
    type: 'Binary',
  };
}

function func(name: string, a: Ast): Ast {
  return {
    arguments: [a],
    name: name,
    type: 'Function',
  };
}

function constant(name: string): Ast {
  return {
    name: name,
    type: 'Const',
  };
}

export class Parser {
  protected _tokens: string[];
  protected _index: number;

  get tokens(): string[] {
    return this._tokens;
  }

  constructor(tokens: string[]) {
    if (!tokens) {
      throw new Error(`Parser: tokens is blank`);
    }
    this._index = 0;
    this._tokens = tokens;
  }

  public parse(): Ast {
    this._index = 0;
    return this.expression();
  }

  private number(): Ast {
    let sign = '';
    if (this._tokens[this._index] === '+' || this._tokens[this._index] === '-') {
      sign = this._tokens[this._index++];
    }

    const token: string = this._tokens[this._index++];
    let ast: Ast = {
      type: 'Int',
      value: token,
    };
    if (token === 'pi') {
      ast = constant('pi');
    } else if (token === 'e') {
      ast = constant('e');
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

  private factor(): Ast {
    let funcName = '';
    if (this._tokens[this._index] === 'sin'
        || this._tokens[this._index] === 'cos'
        || this._tokens[this._index] === 'tan') {
      funcName = this._tokens[this._index];
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

  private term(): Ast {
    let ast: Ast = this.factor();
    for (;;) {
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

  private expression(): Ast {
    let ast: Ast = this.term();

    const limit = 1000;
    for (let i = 0; ; i++) {
      if (i > limit) {
        throw new Error(`too long loop: limit=${limit}`);
      }
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
