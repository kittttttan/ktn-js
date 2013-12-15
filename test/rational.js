var Rational = require('../js/rational.js').Rational;

describe("Rational", function() {
  it("zero", function() {
    expect(Rational.zero.toString()).toEqual('0/1');
  });

  it("one", function() {
    expect(Rational.one.toString()).toEqual('1/1');
  });

  it("num", function() {
    expect(Rational.num(0).toString()).toEqual('0/1');
    expect(Rational.num(1).toString()).toEqual('1/1');
    expect(Rational.num(123456789).toString()).toEqual('123456789/1');
    expect(Rational.num(-2147483647).toString()).toEqual('-2147483647/1');
    expect(Rational.num(36, -1024).toString()).toEqual('-9/256');
  });

  it("str", function() {
    expect(Rational.str('0').eq(Rational.zero)).toBe(true);
    expect(Rational.str('00').eq(Rational.zero)).toBe(true);
    expect(Rational.str('7').toString()).toEqual('7/1');
    expect(Rational.str('-777/7777').toString()).toEqual('-111/1111');
  });

  it("equal", function() {
    expect(Rational.num(0).equal(Rational.zero)).toBe(true);
    expect(Rational.num(1).equal(Rational.one)).toBe(true);

    expect(Rational.str('0').equal(Rational.zero)).toBe(true);
    expect(Rational.str('1').equal(Rational.one)).toBe(true);
  });

  it("output", function() {
    var r = Rational.num(1, 3);
    expect(r.html()).toEqual('1/3');
    expect(r.tex()).toEqual('\\frac{1}{3}');
  });

  it("valueOf", function() {
    expect(Rational.num(4, 2).valueOf()).toEqual(2.0);
    expect(Rational.num(-1, 2).valueOf()).toEqual(-0.5);
  });

  it("sign", function() {
    var r = Rational.num(1, 3);
    expect(r.neg().toString()).toEqual('-1/3');
    expect(r.abs().toString()).toEqual('1/3');
    expect(r.neg().abs().toString()).toEqual('1/3');
  });

  it("inv", function() {
    expect(Rational.num(2, 3).inv().toString()).toEqual('3/2');
    expect(Rational.num(-6, 10).inv().toString()).toEqual('-5/3');

    expect(function(){ Rational.zero.inv(); }).toThrow();
  });

  it("basic", function() {
    var a = Rational.num(2, 3);
    var b = Rational.num(1, 6);

    expect(a.add(b).toString()).toEqual('5/6');
    expect(a.sub(b).toString()).toEqual('1/2');
    expect(a.mul(b).toString()).toEqual('1/9');
    expect(a.div(b).toString()).toEqual('4/1');
    expect(a.pow(2).toString()).toEqual('4/9');

    expect(a.add(b.neg()).toString()).toEqual('1/2');
    expect(a.sub(b.neg()).toString()).toEqual('5/6');
    expect(a.mul(b.neg()).toString()).toEqual('-1/9');
    expect(a.div(b.neg()).toString()).toEqual('-4/1');
    expect(a.neg().pow(2).toString()).toEqual('4/9');
  });

});
