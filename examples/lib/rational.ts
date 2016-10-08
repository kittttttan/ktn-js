/// <reference path="../node_modules/@ktn/type/typings/rational.d.ts" />
import Rational from '@ktn/rational';

export default class TestRational {
  public static basic(): string {
    const a: Rational = Rational.num(7, -3);
    const b: Rational = Rational.str('-0.1/3');
    return `
a         = ${a}
b         = ${b}
a  +  b   = ${a.add(b)}
a  -  b   = ${a.sub(b)}
a  *  b   = ${a.mul(b)}
a  /  b   = ${a.div(b)}
`;
  }

  public static main(): string {
    let res = '';

    const d = Date.now();

    res += `-- basic operations --
${this.basic()}
Time: ${Date.now() - d}ms
`;

    return res;
  }
}