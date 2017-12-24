/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import {Rational} from '../src/rational';

describe("Rational", ()=> {
  it("zero is 0", ()=> {
    expect(Rational.zero.toString()).toEqual('0');
  });

  it("one is 1", ()=> {
    expect(Rational.one.toString()).toEqual('1');
  });

  it("num", ()=> {
    expect(Rational.num(0).toString()).toEqual('0');
    expect(Rational.num(1).toString()).toEqual('1');
    expect(Rational.num(123456789).toString()).toEqual('123456789');
    expect(Rational.num(-2147483647).toString()).toEqual('-2147483647');
    expect(Rational.num(36, -1024).toString()).toEqual('-9/256');
  });

  it("str", ()=> {
    expect(Rational.str('0').eq(Rational.zero)).toBe(true);
    expect(Rational.str('00').eq(Rational.zero)).toBe(true);
    expect(Rational.str('1').eq(Rational.one)).toBe(true);
    expect(Rational.str('7').toString()).toEqual('7');
    expect(Rational.str('-0.07').toString()).toEqual('-7/100');
    expect(Rational.str('-777/7777').toString()).toEqual('-111/1111');
    expect(Rational.str('0.01/1.234').toString()).toEqual('5/617');
    expect(Rational.str('2.01/-10.5').toString()).toEqual('-67/350');
  });

  it("equal", ()=> {
    expect(Rational.num(0).equal(Rational.zero)).toBe(true);
    expect(Rational.num(1).equal(Rational.one)).toBe(true);

    expect(Rational.str('0').equal(Rational.zero)).toBe(true);
    expect(Rational.str('1').equal(Rational.one)).toBe(true);

    expect(Rational.num(4,-6).equal(Rational.str('-8/12'))).toBe(true);
  });

  it("output", ()=> {
    const r = Rational.num(1, 3);
    expect(r.html()).toEqual('1/3');
    expect(r.tex()).toEqual('\\frac{1}{3}');
  });

  it("sign", ()=> {
    const r = Rational.num(1, 3);
    expect(r.neg().toString()).toEqual('-1/3');
    expect(r.abs().toString()).toEqual('1/3');
    expect(r.neg().abs().toString()).toEqual('1/3');
  });

  it("inv", ()=> {
    expect(Rational.num(2, 3).inv().toString()).toEqual('3/2');
    expect(Rational.num(-6, 10).inv().toString()).toEqual('-5/3');

    expect(()=>{ Rational.zero.inv(); }).toThrow();
  });

  it("basic", ()=> {
    const a = Rational.num(2, 3);
    const b = Rational.num(1, 6);

    expect(a.add(b).toString()).toEqual('5/6');
    expect(a.sub(b).toString()).toEqual('1/2');
    expect(a.mul(b).toString()).toEqual('1/9');
    expect(a.div(b).toString()).toEqual('4');
    expect(a.pow(2).toString()).toEqual('4/9');

    expect(a.add(b.neg()).toString()).toEqual('1/2');
    expect(a.sub(b.neg()).toString()).toEqual('5/6');
    expect(a.mul(b.neg()).toString()).toEqual('-1/9');
    expect(a.div(b.neg()).toString()).toEqual('-4');
    expect(a.neg().pow(2).toString()).toEqual('4/9');
  });

});
