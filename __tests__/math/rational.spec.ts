import { expect, test } from 'vitest'
import { Rational } from '../../src/math/rational'

test("zero is 0", () => {
  expect(Rational.zero.toString()).toBe('0');
});

test("one is 1", () => {
  expect(Rational.one.toString()).toBe('1');
});

test("num", () => {
  expect(Rational.num(0n).toString()).toBe('0');
  expect(Rational.num(1n).toString()).toBe('1');
  expect(Rational.num(123456789n).toString()).toBe('123456789');
  expect(Rational.num(-2147483647n).toString()).toBe('-2147483647');
  expect(Rational.num(36n, -1024n).toString()).toBe('-9/256');
});

test("str", () => {
  expect(Rational.str('0').eq(Rational.zero)).toBe(true);
  expect(Rational.str('00').eq(Rational.zero)).toBe(true);
  expect(Rational.str('1').eq(Rational.one)).toBe(true);
  expect(Rational.str('7').toString()).toBe('7');
  expect(Rational.str('-0.07').toString()).toBe('-7/100');
  expect(Rational.str('-777/7777').toString()).toBe('-111/1111');
  expect(Rational.str('0.01/1.234').toString()).toBe('5/617');
  expect(Rational.str('2.01/-10.5').toString()).toBe('-67/350');
});

test("equal", () => {
  expect(Rational.num(0n).equal(Rational.zero)).toBe(true);
  expect(Rational.num(1n).equal(Rational.one)).toBe(true);

  expect(Rational.str('0').equal(Rational.zero)).toBe(true);
  expect(Rational.str('1').equal(Rational.one)).toBe(true);

  expect(Rational.num(4n, -6n).equal(Rational.str('-8/12'))).toBe(true);
});

test("output", () => {
  const r = Rational.num(1n, 3n);
  expect(r.html()).toBe('1/3');
  expect(r.tex()).toBe('\\frac{1}{3}');
});

test("sign", () => {
  const r = Rational.num(1n, 3n);
  expect(r.neg().toString()).toBe('-1/3');
  expect(r.abs().toString()).toBe('1/3');
  expect(r.neg().abs().toString()).toBe('1/3');
});

test("inv", () => {
  expect(Rational.num(2n, 3n).inv().toString()).toBe('3/2');
  expect(Rational.num(-6n, 10n).inv().toString()).toBe('-5/3');

  expect(() => { Rational.zero.inv(); }).toThrow();
});

test("basic", () => {
  const a = Rational.num(2n, 3n);
  const b = Rational.num(1n, 6n);

  expect(a.add(b).toString()).toBe('5/6');
  expect(a.sub(b).toString()).toBe('1/2');
  expect(a.mul(b).toString()).toBe('1/9');
  expect(a.div(b).toString()).toBe('4');
  expect(a.pow(2n).toString()).toBe('4/9');

  expect(a.add(b.neg()).toString()).toBe('1/2');
  expect(a.sub(b.neg()).toString()).toBe('5/6');
  expect(a.mul(b.neg()).toString()).toBe('-1/9');
  expect(a.div(b.neg()).toString()).toBe('-4');
  expect(a.neg().pow(2n).toString()).toBe('4/9');
});
