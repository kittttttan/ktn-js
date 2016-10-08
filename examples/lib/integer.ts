/// <reference path="../node_modules/@ktn/type/typings/integer.d.ts" />
import Integer from '@ktn/integer';

export default class TestInteger {
  static random(len: int): string {
    let r: string = '';
    for (let i: int = 0; i < len; ++i) {
      r += `${Math.random() * 10 | 0}`;
    }
    r = r.replace(/^0+/, '');

    return r;
  }

  static basic(): string {
    const r: string = TestInteger.random(10);
    const a: Integer = Integer.str(r);
    const b: Integer = Integer.num(100000);
    return `a         = ${a}
b         = ${b}
a  +  b   = ${a.add(b)}
a  -  b   = ${a.sub(b)}
a  *  b   = ${a.mul(b)}
a  /  b   = ${a.div(b)}
a  %  b   = ${a.mod(b)}
a >>  2   = ${a.rightShift(2)}
a <<  2   = ${a.leftShift(2)}
a >> 17   = ${a.rightShift(17)}
a << 17   = ${a.leftShift(17)}
a ^  2    = ${a.pow(2)}
√a       = ${a.sqrt()}
gcd(a, b) = ${a.gcd(b)}
          = ${a.gcdBin(b)}
`;
  }

  static fib(a: int): Integer {
    let b: Integer = Integer.zero;
    let i: int = 0;
    let c: Integer = Integer.one;
    while (i < a) {
      let d: Integer = b.clone();
      b = b.add(c);
      c = d;
      i = i + 1;
    }
    return b;
  }

  static pi(a: int): Integer {
    if (!a) {
      a = 1;
    }
    const n = Integer.num(10).pow(a);
    const arccot = function(m): Integer {
      let c: Integer = n;
      let cm: Integer = c.div(m);
      let b: Integer = cm.clone();
      const m2: Integer = m.square();
      let k: Integer = Integer.one;
      let s: boolean = true;
      const l2: Integer = Integer.num(2);
      while (c.isNonZero()) {
        b = b.div(m2);
        k = k.add(l2);
        c = b.div(k);
        s = !s;
        cm = s ? cm.add(c) : cm.sub(c);
      }
      return cm;
    };
    const a5: Integer = arccot(Integer.num(5));
    const a239: Integer = arccot(Integer.num(239));
    return a5.leftShift(2).sub(a239).leftShift(2);
  }

  static main(): string {
    let res: string = '';
    const d: int = Date.now();

    res += `-- basic operations --
${TestInteger.basic()}
`;

    const a0: int = 77;
    res += `
-- fibonacchi --
fib(${a0}) = ${TestInteger.fib(a0)}`;
    res += `
-- pi --
pi(${a0}) = ${TestInteger.pi(a0)}`;

    res += `
Time: ${Date.now() - d}ms
`;

    return res;
  }
}
