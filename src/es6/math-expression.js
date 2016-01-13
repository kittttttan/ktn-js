/**
 * MathExpression
 * @example
 *  var me = MathExpression.create('(-7+3/2)*3^2+$sin($p)');
 *
 *  me._t // (,-,7,+,3,/,2,),*,3,^,2,+,$sin,(,$p,)
 *  me.parseString() // add(mul(add(neg(7), div(3, 2)), pow(3, 2)), sin(CONST.PI))
 *  me.parse() // (sin(pi)+(-99/2))
 *  me.valueOf() // -49.5
 */

import {Add} from './add';
import {Mul} from './mul';
import {Pow} from './pow';
import {Trigon} from './trigon';
import {Const} from './const';

const add = Add.add;
const sub = Add.sub;
const mul = Mul.mul;
const div = Mul.div;
const pow = Pow.pow;
const neg = (a) => {
  if (typeof (a.neg) === 'function') {
    return a.neg();
  }
  return -a;
};

const sin = Trigon.sin;
const cos = Trigon.cos;
const tan = Trigon.tan;

/**
 * @private
 * @type {number}
 */
let _ME_INDEX = 0;

/**
 * MathExpression
 * @class MathExpression
 */
export class MathExpression {
  /**
   * @static
   * @param {string} str
   * @return {MathExpression}
   */
  static create(str) {
    return new MathExpression(str);
  }

  /**
   * @property {string} _s source
   * @property {Array<string>} _t token
   * @param {string} source
   */
  constructor(source) {
    _ME_INDEX = 0;
    this._s = source;
    this._t = meGetToken(source);
  }

  toString() {
    return this._s;
  }

  parse() {
    _ME_INDEX = 0;
    return meExpression(this._t, _ME_INDEX);
  }
}

/**
 * @private
 * @param {string} token
 * @return {string}
 */
function meNumber(token) {
  let sign;
  if (token[_ME_INDEX] === '+' || token[_ME_INDEX] === '-') {
    sign = token[_ME_INDEX++];
  }

  let ans = token[_ME_INDEX++];
  if (ans === '$p') {
    ans = Const.PI;
  } else if (ans === '$e') {
    ans = Const.E;
  }/* else if (isNaN(+ans)) {
    ans = vari(ans);
  }*/

  if (token[_ME_INDEX] === '^') {
    _ME_INDEX += 1;
    ans = pow(ans, meFactor(token));
  }

  if (sign === '-') {
    return neg(ans);
  }

  return ans;
}

/**
 * @private
 * @param {string} token
 * @return {string}
 */
function meFactor(token) {
  let flag = 0;
  if (token[_ME_INDEX] === '$sin') {
    flag = 1;
    _ME_INDEX += 1;
  } else if (token[_ME_INDEX] === '$cos') {
    flag = 2;
    _ME_INDEX += 1;
  } else if (token[_ME_INDEX] === '$tan') {
    flag = 3;
    _ME_INDEX += 1;
  }
  if (token[_ME_INDEX] === '(') {
    _ME_INDEX += 1;
    let ans = meExpression(token);
    if (token[_ME_INDEX] !== ')') {
      throw new SyntaxError('Missing )');
    }
    _ME_INDEX++;
    if (flag === 1) { return sin(ans); }
    if (flag === 2) { return cos(ans); }
    if (flag === 3) { return tan(ans); }
    if (token[_ME_INDEX] === '^') {
      _ME_INDEX += 1;
      ans = pow(ans, meFactor(token));
    }
    return ans;
  }
  return meNumber(token);
}

/**
 * @private
 * @param {string} token
 * @return {string}
 */
function meTerm(token) {
  let ans = meFactor(token);
  while (true) {
    if (token[_ME_INDEX] === '^') {
      _ME_INDEX += 1;
      ans = pow(ans, meFactor(token));
    } else if (token[_ME_INDEX] === '*') {
      _ME_INDEX += 1;
      ans = mul(ans, meFactor(token));
    } else if (token[_ME_INDEX] === '/') {
      _ME_INDEX += 1;
      const x = meFactor(token);
      if (!x) {
        throw new Error('ZeroDivideError');
      }
      ans = div(ans, x);
    } else {
      break;
    }
  }

  return ans;
}

/**
 * @private
 * @param {Array<string>} token
 * @return {?}
 */
function meExpression(token) {
  let ans = meTerm(token);
  while (true) {
    if (token[_ME_INDEX] === '+') {
      _ME_INDEX += 1;
      ans = add(ans, meTerm(token));
    } else if (token[_ME_INDEX] === '-') {
      _ME_INDEX += 1;
      ans = sub(ans, meTerm(token));
    } else {
      break;
    }
  }

  return ans;
}

/**
 * @private
 * @param {string} str
 * @return {Array<string>}
 */
function meGetToken(str) {
  str = str.replace(/[ \n\r]/g, '');

  const token = [];
  token[0] = [];

  let before;
  let index = 0;
  for (const c of str) {
    switch (c) {
      /** operation */
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
        if (before === 'n') {
          //cast 'number' with unitary +
          token[index] = +token[index++].join('');
        } else if (before === 'c') {
          token[index] = token[index++].join('');
        }
        if (before !== 'o') {
          token[index] = c;
          token[++index] = [];
          before = 'o';
        }
        break;
      /** number */
      case '1':case '2':case '3':case '4':case '5':
      case '6':case '7':case '8':case '9':
      case '0':
      case '.':
        if (before === 'c') {
          token[index] = token[index].join('');
          token[++index] = [];
        }
        token[index].push(c);
        before = 'n';
        break;
      /** sign */
      case '(':case ')':
        if (before === 'n') {
          token[index] = parseFloat(token[index++].join(''));
        } else if (before === 'c') {
          token[index] = token[index++].join('');
        }
        token[index] = c;
        token[++index] = [];
        before = '()';
        break;
      /** character */
      default:
        if (before === 'n') {
          token[index] = parseFloat(token[index].join(''));
          token[++index] = [];
        }
        token[index].push(c);
        before = 'c';
        break;
    }
  }

  if (before === 'n') {
    token[index] = parseFloat(token[index].join(''));
  } else if (before === 'c') {
    token[index] = token[index].join('');
  } else {
    token.length -= 1;
  }

  return token;
}
