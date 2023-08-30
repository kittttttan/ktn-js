import { expect, test } from 'vitest'
import { dec, Decimal } from '../../src/math/decimal'

test("zero is 0", () => {
  expect(Decimal.zero.toString()).toBe('0');
});

test("one is 1", () => {
  expect(Decimal.one.toString()).toBe('1');
});

test("dec", () => {
  expect(dec(1, 1).toString()).toBe('10');
  expect(dec(1, 2).toString()).toBe('100');
  expect(dec(1, -1).toString()).toBe('0.1');
  expect(dec(1, -2).toString()).toBe('0.01');
});

test("basic", () => {
  const a = dec(1n, 1);
  const b = dec(2n, -1);

  expect(a.add(b).toString()).toBe('10.2');
  expect(a.sub(b).toString()).toBe('9.8');
  expect(a.mul(b).toString()).toBe('2');
  expect(a.div(b).norm().toString()).toBe('50');
  expect(a.pow(2).toString()).toBe('100');
});

test("floor", () => {
  expect(dec(123, -2).floor(-1).toString()).toBe('1.2');
  expect(dec(123, -2).floor(0).toString()).toBe('1');
  expect(dec(123, -2).floor(1).toString()).toBe('0');
  expect(dec(123, -2).floor(2).toString()).toBe('0');
  expect(dec(123, -2).floor(-2).toString()).toBe('1.23');
  expect(dec(123, -2).floor(-3).toString()).toBe('1.23');
});

test("pi", () => {
  expect(dec(22).div(dec(7)).floor(-2).toString()).toBe('3.14');
  expect(dec(355).div(dec(113)).floor(-6).toString()).toBe('3.141592');
});
