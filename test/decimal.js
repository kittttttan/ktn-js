import {Decimal} from '../es6/decimal.js';

describe("Decimal", ()=> {
  it("zero", ()=> {
    expect(Decimal.zero.toString()).toEqual('0');
  });

  it("one", ()=> {
    expect(Decimal.one.toString()).toEqual('1');
  });

  it("num", ()=> {
    expect(Decimal.num(0).toString()).toEqual('0');
    expect(Decimal.num(1).toString()).toEqual('1');
    expect(Decimal.num(123456789).toString()).toEqual('123456789');
    expect(Decimal.num(-2147483647).toString()).toEqual('-2147483647');
    expect(Decimal.num(1, 3).toString()).toEqual('1000');
    expect(Decimal.num(1, -2).toString()).toEqual('0.01');
  });

  it("str", ()=> {
    //expect(Decimal.str('0').eq(Decimal.zero)).toBe(true);
    //expect(Decimal.str('00').eq(Decimal.zero)).toBe(true);
    expect(Decimal.str('7').toString()).toEqual('7');
    expect(Decimal.str('-777.7777').toString()).toEqual('-777.7777');
  });

  it("output", ()=> {
    const d = Decimal.num(1, 3);
    expect(d.html()).toEqual('1&times;10<sup>3</sup>');
    expect(d.tex()).toEqual('1\times 10^3');
  });

  it("valueOf", ()=> {
    expect(Decimal.num(4, -2).valueOf()).toEqual(0.04);
    expect(Decimal.num(-1, 2).valueOf()).toEqual(-100);
  });

  it("sign", ()=> {
    const d = Decimal.num(1, -3);
    expect(d.neg().toString()).toEqual('-0.001');
    expect(d.abs().toString()).toEqual('0.001');
    expect(d.neg().abs().toString()).toEqual('0.001');
  });

  it("basic", ()=> {
    const a = Decimal.num(1, 2);
    const b = Decimal.num(2, -1);

    expect(a.add(b).toString()).toEqual('100.2');
    expect(a.sub(b).toString()).toEqual('99.8');
    expect(a.mul(b).toString()).toEqual('20');
    expect(a.div(b).toString()).toEqual('500');

    //expect(a.add(b.neg()).toString()).toEqual('99.8');
    //expect(a.sub(b.neg()).toString()).toEqual('100.2');
    //expect(a.mul(b.neg()).toString()).toEqual('-20');
    //expect(a.div(b.neg()).toString()).toEqual('-500');
  });

});
