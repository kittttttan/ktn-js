import Integer from '../../src/ts/integer';

export default class TestInteger {
  static random(len: number): string {
    let r = '';
	for (let i = 0; i < len; ++i) {
	  r += `${Math.random() * 10 | 0}`;
	}
	r = r.replace(/^0+/, '');

	return r;
  }

  static basic(): void {
    const r: string = TestInteger.random(10);
    const a: Integer = Integer.str(r);
    const b: Integer = Integer.num(100000);
    console.log(`a         = ${a}`);
    console.log(`b         = ${b}`);
    console.log(`a  +  b   = ${a.add(b)}`);
    console.log(`a  -  b   = ${a.sub(b)}`);
    console.log(`a  *  b   = ${a.mul(b)}`);
    console.log(`a  /  b   = ${a.div(b)}`);
    console.log(`a  %  b   = ${a.mod(b)}`);
    console.log(`a >>  2   = ${a.rightShift(2)}`);
    console.log(`a <<  2   = ${a.leftShift(2)}`);
    console.log(`a >> 17   = ${a.rightShift(17)}`);
    console.log(`a << 17   = ${a.leftShift(17)}`);
    console.log(`a ^  2    = ${a.pow(2)}`);
    console.log(`√a       = ${a.sqrt()}` );
    console.log(`gcd(a, b) = ${a.gcd(b)}`);
    console.log(`          = ${a.gcdBin(b)}`);
  }

  static fib(a: number): Integer {
    let b: Integer = Integer.zero;
    let i: number = 0;
    let c: Integer = Integer.one;
    while (i < a) {
      let d: Integer = b.clone();
      b = b.add(c);
      c = d;
      i = i + 1;
    }
    return b;
  }

  static pi(a: number): Integer {
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
      const l2 = Integer.num(2);
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

  static main() {
    const d = Date.now();

    console.log('-- basic operations --');
    TestInteger.basic();

    const a0 = 77;
    console.log(`-- fibonacchi --
    fib(${a0}) = ${TestInteger.fib(a0)}`);
    console.log(`-- pi --
    pi(${a0}) = ${TestInteger.pi(a0)}`);

    console.log(`Time: ${Date.now() - d}ms`);
  }
}

TestInteger.main();
