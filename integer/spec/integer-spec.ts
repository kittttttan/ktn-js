/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import Integer from '../src/integer';

describe("Integer", ()=> {
  it("zero", ()=> {
    expect(Integer.zero.toString()).toEqual('0');
  });

  it("one", ()=> {
    expect(Integer.one.toString()).toEqual('1');
  });

  it("num", ()=> {
    expect(Integer.num(0).toString()).toEqual('0');
    expect(Integer.num(0).eq(Integer.zero)).toBe(true);
    expect(Integer.num(1).toString()).toEqual('1');
    expect(Integer.num(123456789).toString()).toEqual('123456789');
    expect(Integer.num(-2147483647).toString()).toEqual('-2147483647');
    expect(Integer.num(1234567890).toString()).toEqual('1234567890');
    expect(Integer.num(0x7fffffff).toString(16)).toEqual('7fffffff');
  });

  it("str", ()=> {
    expect(Integer.str('0').eq(Integer.zero)).toBe(true);
    expect(Integer.str('00').eq(Integer.zero)).toBe(true);
    expect(Integer.str('+111', 2).toString()).toEqual('7');
    expect(Integer.str('-1234567', 8).toString()).toEqual('-342391');
    expect(Integer.str('ffffffff', 16).toString()).toEqual('4294967295');
  });

  it("exp", ()=> {
    expect(Integer.exp('1000').toString()).toEqual('1000');
    expect(Integer.exp('1e3').toString()).toEqual('1000');
    expect(Integer.exp('3.14e+4').toString()).toEqual('31400');
    expect(Integer.exp('314e-2').toString()).toEqual('3');
  });

  it("any", ()=> {
    expect(Integer.any(null).eq(Integer.zero)).toBe(true);
    expect(Integer.any(12345678900).toString()).toEqual('12345678900');
    expect(Integer.any(-0x7fffffff).toString(16)).toEqual('-7fffffff');
    expect(Integer.any(1234567).toString()).toEqual('1234567');
    expect(Integer.any(3.14).toString()).toEqual('3');
    expect(Integer.any('7654321').toString()).toEqual('7654321');
    expect(Integer.any('1e3').toString()).toEqual('1000');
  });

  it("equal", ()=> {
    expect(Integer.num(0).equal(Integer.zero)).toBe(true);
    expect(Integer.num(1).equal(Integer.one)).toBe(true);

    expect(Integer.str('0').equal(Integer.zero)).toBe(true);
    expect(Integer.str('1').equal(Integer.one)).toBe(true);

    expect(Integer.any('0').equal(Integer.zero)).toBe(true);
    expect(Integer.any('1').equal(Integer.one)).toBe(true);
  });

  it("toString", ()=> {
    const a = Integer.str('1234567890');

    expect(a.toString()).toEqual('1234567890');
    expect(a.toString(2)).toEqual('1001001100101100000001011010010');
    expect(a.toString(8)).toEqual('11145401322');
    expect(a.toString(16)).toEqual('499602d2');
  });

  it("is", ()=> {
    const a = Integer.str('1234567890987654321');
    const z = Integer.zero;

    expect(a.isOdd()).toBe(true);
    expect(a.isEven()).toBe(false);
    expect(a.isNonZero()).toBe(true);

    expect(z.isOdd()).toBe(false);
    expect(z.isEven()).toBe(true);
    expect(z.isNonZero()).toBe(false);
  });

  it("get", ()=> {
    const a = Integer.num((1 << 16) + 2);

    expect(a.sign).toBe(true);
    expect(a.arrayLength).toEqual(2);
    expect(a.capacity >= a.arrayLength).toBe(true);

    const ds = a.digits;
    expect(ds[1]).toEqual(1);
    expect(ds[0]).toEqual(2);
  });

  it("basic", ()=> {
    const a = Integer.str('1234567890');
    const b = Integer.num(10).pow(7);

    expect(a.toString()).toEqual('1234567890');
    expect(a.clone().toString()).toEqual('1234567890');
    expect(a.neg().toString()).toEqual('-1234567890');

    expect(b.toString()).toEqual('10000000');

    expect(a.add(b).toString()).toEqual('1244567890');
    expect(a.sub(b).toString()).toEqual('1224567890');
    expect(a.mul(b).toString()).toEqual('12345678900000000');
    expect(a.div(b).toString()).toEqual('123');
    expect(a.mod(b).toString()).toEqual('4567890');
    expect(a.square().toString()).toEqual('1524157875019052100');
    
    expect(a.sqrt().toString()).toEqual('35136');
    expect(a.gcd(b).toString()).toEqual('10');
    expect(a.gcdBin(b).toString()).toEqual('10');
    expect(b.gcdBin(a).toString()).toEqual('10');
  });

  it("add", ()=> {
    const a = Integer.num(1e7);
    const one = Integer.one;
    const mOne = one.neg();
    
    expect(a.add(Integer.zero).toString()).toEqual('10000000');
    expect(a.add(one).toString()).toEqual('10000001');
    expect(a.add(mOne).toString()).toEqual('9999999');
    expect(mOne.add(a).toString()).toEqual('9999999');
    expect(a.add(a).toString()).toEqual('20000000');
  });

  it("sub", ()=> {
    const a = Integer.num(1e7);
    const one = Integer.one;
    const mOne = one.neg();
    
    expect(a.sub(Integer.zero).toString()).toEqual('10000000');
    expect(a.sub(one).toString()).toEqual('9999999');
    expect(a.sub(mOne).toString()).toEqual('10000001');
    expect(a.sub(a).toString()).toEqual('0'); 
    expect(one.sub(a).toString()).toEqual('-9999999');
    expect(mOne.sub(a).toString()).toEqual('-10000001');
    expect(Integer.zero.sub(a).toString()).toEqual('-10000000');
  });

  it("mul", ()=> {
    const a = Integer.num(1e7);
    
    expect(a.mul(Integer.zero).toString()).toEqual('0');
    expect(a.mul(Integer.one).toString()).toEqual('10000000');
    expect(a.mul(a).toString()).toEqual('100000000000000'); 
    expect(Integer.one.neg().mul(a).toString()).toEqual('-10000000');
  });

  it("kmul", ()=> {
    const a = Integer.exp('1e777');
    
    expect(a.kmul(Integer.zero).toString()).toEqual('0');
    expect(Integer.zero.kmul(a).toString()).toEqual('0');
    expect(a.kmul(Integer.one).toString()).toEqual(a.toString());
    expect(a.kmul(a).toString()).toEqual(Integer.exp('1e1554').toString()); 
  });

  it("div", ()=> {
    const a = Integer.num(1e7);
    
    expect(()=>{ a.div(Integer.zero); }).toThrow();
    expect(a.div(Integer.one).toString()).toEqual('10000000');
    expect(a.div(a).toString()).toEqual('1'); 
    expect(Integer.one.neg().div(a).toString()).toEqual('0');
  });

  it("mod", ()=> {
    const a = Integer.num(1e7);
    
    expect(()=>{ a.mod(Integer.zero); }).toThrow();
    expect(a.mod(Integer.one).toString()).toEqual('0');
    expect(a.mod(a).toString()).toEqual('0'); 
    expect(Integer.one.neg().mod(a).toString()).toEqual('-1');
  });

  it("shift", ()=> {
    const one = Integer.one;
    const two = Integer.num(2);
    const ls7 = one.leftShift(7);
    const ls17 = one.leftShift(17);
    const ls27 = one.leftShift(27);
    const ls37 = one.leftShift(37);
    const ls47 = one.leftShift(47);

    expect(ls7.toString()).toEqual('128');
    expect(ls17.toString()).toEqual('131072');
    expect(ls27.toString()).toEqual('134217728');
    expect(ls37.toString()).toEqual('137438953472');
    expect(ls47.toString()).toEqual('140737488355328');

    expect(two.pow(0).toString()).toEqual('1');
    expect(two.pow(7).toString()).toEqual('128');
    expect(two.pow(17).toString()).toEqual('131072');
    expect(two.pow(27).toString()).toEqual('134217728');
    expect(two.pow(37).toString()).toEqual('137438953472');
    expect(two.pow(47).toString()).toEqual('140737488355328');

    expect(ls7.rightShift(7).toString()).toEqual('1');
    expect(ls17.rightShift(17).toString()).toEqual('1');
    expect(ls27.rightShift(27).toString()).toEqual('1');
    expect(ls37.rightShift(37).toString()).toEqual('1');
    expect(ls47.rightShift(47).toString()).toEqual('1');
  });

  it("factorial", function () {
    expect(Integer.factorial(0).toString()).toEqual('1');
    expect(Integer.factorial(1).toString()).toEqual('1');
    expect(Integer.factorial(2).toString()).toEqual('2');
    expect(Integer.factorial(3).toString()).toEqual('6');
    expect(Integer.factorial(10).toString()).toEqual('3628800');
    expect(Integer.factorial(17).toString()).toEqual('355687428096000');
    expect(Integer.factorial(20).toString()).toEqual('2432902008176640000');
  });

  it("sqrt", function () {
    expect(Integer.zero.sqrt().toString()).toEqual('0');
    expect(Integer.one.sqrt().toString()).toEqual('1');
    expect(Integer.num(4).sqrt().toString()).toEqual('2');
    expect(Integer.num(77).sqrt().toString()).toEqual('8');
    expect(Integer.str('1000000').sqrt().toString()).toEqual('1000');
    expect(Integer.str('10000000000').sqrt().toString()).toEqual('100000');
    expect(Integer.exp('1e20').sqrt().toString()).
        toEqual(Integer.exp('1e10').toString());
  });

  it("gcd", function () {
    const a = Integer.exp('1e20');

    expect(a.gcd(Integer.zero)).toEqual(a);
    expect(a.gcd(Integer.one).toString()).toEqual('1');
    expect(a.gcd(a).toString()).toEqual(a.toString());
    expect(a.gcd(Integer.num(10)).toString()).toEqual('10');
    expect(a.gcd(Integer.exp('1e10')).toString()).
        toEqual(Integer.exp('1e10').toString());

    expect(a.gcdBin(Integer.zero)).toEqual(a);
    expect(a.gcdBin(Integer.one).toString()).toEqual('1');
    expect(a.gcdBin(a).toString()).toEqual(a.toString());
    expect(a.gcdBin(Integer.num(10)).toString()).toEqual('10');
    expect(a.gcdBin(Integer.exp('1e10')).toString()).
        toEqual(Integer.exp('1e10').toString());
  });

  it("fib", ()=>{
    const fib = (a)=> {
      let b = Integer.zero;
      for (let i = 0, c = Integer.one, d; i < a; ++i) {
        d = b.clone();
        b = b.add(c);
        c = d;
      }
      return b;
    };

    expect(fib(0).toString()).toEqual('0');
    expect(fib(1).toString()).toEqual('1');
    expect(fib(2).toString()).toEqual('1');
    expect(fib(3).toString()).toEqual('2');
    expect(fib(4).toString()).toEqual('3');
    expect(fib(38).toString()).toEqual('39088169');
  });

  it("pi", ()=>{
    const pi = (a)=> {
      if (!a) { a = 1; }
      const n = Integer.num(10).pow(a);

      function arccot(m) {
        var c = n, a = c.div(m), b = a.clone(), m2 = m.square(),
            k = Integer.num(1), s = true, l2 = Integer.num(2);
        while (c.isNonZero()) {
          b = b.div(m2);
          k = k.add(l2);
          c = b.div(k);
          s = !s;
          if (s) {
            a = a.add(c);
          } else {
            a = a.sub(c);
          }
        }
        return a;
      }

      const a5 = arccot(Integer.num(5));
      const a239 = arccot(Integer.num(239));
      return a5.leftShift(2).sub(a239).leftShift(2);
    };
    const p = '314159265358979323846264338327950288419716939937510582097494459230781640628620948';

    expect(pi(80).toString()).toEqual(p);
  });

});
